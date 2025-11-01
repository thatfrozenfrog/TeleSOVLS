import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import { solveBoard } from "../../modules/2048.js";

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
  __auto2048Running = true;
  try {
    alert("Auto 2048 script started. Press Ctrl+C to stop.");
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
    alert("Auto 2048 script stopped.");
  } catch {}
}
