import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import { solveBoard } from "../../modules/2048.js";
import { registerToggleTool } from "../ui.js";
import swal from "sweetalert";
export function initAuto2048Tool() {
  registerToggleTool({
    id: "th-auto-2048",
    title: "Auto 2048",
    description: "Automatically solves 2048 game (Ctrl+C to stop)",
    toggleId: "th-auto-2048-toggle",
    initialChecked: __auto2048Running,
    onToggleChange: (checked) => {
      handleAuto2048Toggle(checked);
    },
    onReady: ({ checkbox }) => {
      setAuto2048Toggle(checkbox);
    },
  });
}

export function parseboard() {
  let b = terminal.getViewportContent();
  let board = b
    .split("\n")
    .filter((i) => i)
    .filter((j, i) => (i - 2) % 4 == 0)
    .map((line) => line.replace(/\s+/g, " "))
    .flatMap((row) =>
      row
        .split("|")
        .slice(1, -1)
        .map((cell) => {
          const trimmed = cell.trim();
          return trimmed === "" ? "0" : trimmed;
        }),
    )
    .join(" ");
  return board;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let __auto2048Running = false;
let auto2048Toggle = null;
let auto2048Task = null;

function setAuto2048Toggle(toggle) {
  auto2048Toggle = toggle;
}

function syncAuto2048Toggle(running) {
  if (auto2048Toggle && auto2048Toggle.checked !== running) {
    auto2048Toggle.checked = running;
  }
}

function setAuto2048Running(running) {
  __auto2048Running = running;
  syncAuto2048Toggle(running);
}

function ensureSocketReady() {
  const socket = window?.socket;
  if (!socket || socket.readyState !== 1) {
    swal("Feature unavailable", "WebSocket not captured.", "error");
    return false;
  }
  return true;
}

function handleAuto2048Toggle(shouldRun) {
  if (shouldRun) {
    if (!ensureSocketReady()) {
      syncAuto2048Toggle(false);
      return;
    }
    if (__auto2048Running || auto2048Task) {
      syncAuto2048Toggle(true);
      return;
    }
    setAuto2048Running(true);
    auto2048Task = autosolve()
      .catch((error) => {
        console.error("auto2048: failed to run", error);
      })
      .finally(() => {
        auto2048Task = null;
        setAuto2048Running(false);
      });
  } else {
    setAuto2048Running(false);
  }
}

function attachCtrlCToStop() {
  const term = window?.term;
  if (!term || typeof term.attachCustomKeyEventHandler !== "function") {
    return () => {};
  }
  const handler = (ev) => {
    if (ev?.type === "keydown") {
      const key = ev.key;
      if ((ev.ctrlKey || ev.metaKey) && (key === "c" || key === "C")) {
        __auto2048Running = false;
        return false;
      }
    }
    return true;
  };
  term.attachCustomKeyEventHandler(handler);
  return () => {
    try {
      window?.term?.attachCustomKeyEventHandler?.(() => true);
    } catch {}
  };
}

async function waitForSocketOpen(timeoutMs = 2000, pollMs = 25) {
  const start = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const s = window?.socket;
    if (s && s.readyState === 1) return true;
    if (Date.now() - start > timeoutMs) return false;
    await sleep(pollMs);
  }
}

async function waitForViewportChange(
  prevViewport,
  { timeoutMs = 1500, pollMs = 16 } = {},
) {
  const start = Date.now();
  while (true) {
    const cur = terminal.getViewportContent();
    if (cur && cur !== prevViewport) return cur;
    if (Date.now() - start > timeoutMs) return null;
    await sleep(pollMs);
  }
}

async function sendKeyAndWait(key, prevViewport) {
  const ok = await waitForSocketOpen();
  if (!ok) {
    console.warn("autosolve: socket not ready; skipping key", key);
    return null;
  }
  keyboard.sendkey(key);
  return await waitForViewportChange(prevViewport);
}

export async function autosolve() {
  if (!__auto2048Running) {
    __auto2048Running = true;
  }
  try {
    swal("Auto 2048 script started. Press Ctrl+C to stop.");
  } catch {}
  const detachHandler = attachCtrlCToStop();
  while (__auto2048Running) {
    const beforeViewport = terminal.getViewportContent();
    const board = parseboard();
    let nextmove;
    try {
      nextmove = await solveBoard(board);
    } catch (e) {
      console.error("autosolve: solveBoard failed", e);
      await sleep(100);
      continue;
    }

    if (!nextmove || typeof nextmove !== "string") {
      console.warn("autosolve: invalid move from solver", nextmove);
      await sleep(100);
      continue;
    }

    const allowed = ["Left", "Right", "Up", "Down"];
    const key = allowed.includes(nextmove) ? nextmove : null;

    if (!key) {
      await sleep(100);
      continue;
    }

    const changed = await sendKeyAndWait(key, beforeViewport);
    if (!changed) {
      console.warn("autosolve: viewport did not change after key", key);
      await sleep(50);
    }
  }

  try {
    detachHandler?.();
  } catch {}
  try {
    swal("Auto 2048 script stopped.");
  } catch {}
}
