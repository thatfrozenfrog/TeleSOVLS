import { registerToggleTool, createInputControl } from "../ui.js";
import { getLastLines } from "../terminal.js";
import { sendkey } from "../keyboard.js";
import { type } from "../keyboard.js";

let checkboxElement = null;
let loopActive = false;
let charDelay = 30;
let lineDelay = 50;
let socket = window.socket;

function normalizeDelay(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

function setAutoTypespeedEnabled(enabled) {
  if (typeof window !== "undefined") {
    window.__autoTypespeedEnabled = enabled;
  }
  if (checkboxElement && checkboxElement.checked !== enabled) {
    checkboxElement.checked = enabled;
  }
  if (enabled) {
    autoTypespeed().catch((error) => {
      console.error("[autotypespeed] failed", error);
    });
  }
}

export function initTypespeedTool() {
  const initialEnabled =
    typeof window !== "undefined" && Boolean(window.__autoTypespeedEnabled);

  const { content } = registerToggleTool({
    id: "th-auto-typespeed",
    title: "Auto Typespeed",
    description: "Automatically types commands for the typespeed game",
    toggleId: "th-auto-typespeed-toggle",
    initialChecked: initialEnabled,
    onToggleChange: (checked) => {
      setAutoTypespeedEnabled(checked);
    },
    onReady: ({ checkbox }) => {
      checkboxElement = checkbox;
    },
  });

  const charDelayControl = createInputControl({
    id: "th-auto-typespeed-char-delay",
    label: "charDelay",
    type: "number",
    min: 0,
    step: 10,
    value: charDelay,
    onChange: (raw) => {
      const updated = normalizeDelay(raw, charDelay);
      charDelay = updated;
      return updated;
    },
  });
  const lineDelayControl = createInputControl({
    id: "th-auto-typespeed-line-delay",
    label: "lineDelay",
    type: "number",
    min: 0,
    step: 10,
    value: lineDelay,
    onChange: (raw) => {
      const updated = normalizeDelay(raw, lineDelay);
      lineDelay = updated;
      return updated;
    },
  });

  content.appendChild(charDelayControl.wrapper);
  content.appendChild(lineDelayControl.wrapper);

  setAutoTypespeedEnabled(initialEnabled);
}

export async function autoTypespeed() {
  if (loopActive) {
    return;
  }

  let level = 1;
  let rank = 0;
  let wpm = 0;
  let cpm = 0;
  let misses = 0;
  loopActive = true;
  try {
    if (typeof window !== "undefined") {
      window.__autoTypespeedEnabled = true;
    }

    while (typeof window !== "undefined" && window.__autoTypespeedEnabled) {
      if (!socket || socket.readyState !== 1) {
        socket = window.socket;
      }

      const currentLines = getLastLines(24) || [];
      const statsLine = (getLastLines(1) || [])[0] || "";
      const match = (statsLine.match(/\d+/g) || []).map(Number);

      let prepared = currentLines.filter((line) => Boolean(line));
      prepared = prepared.slice(0, -2);
      prepared = prepared.filter((line) => !/^\s+$/.test(line));
      prepared = prepared.filter((line) => line.startsWith(" "));
      prepared.sort((a, b) => b.length - a.length);
      prepared = prepared.map((line) => line.trim());
      prepared = prepared.filter((line) => line.length > 0);
      if (match.length >= 6) {
        rank = parseInt(match[1], 10);
        level = parseInt(match[2], 10) || 1;
        wpm = parseInt(match[3], 10);
        cpm = parseInt(match[4], 10);
        misses = parseInt(match[5], 10);
      }
      if (prepared.length === 0) {
        await sleep(200);
        continue;
      }
      const payload = prepared.join(" ");
      if (payload.includes("GAME OVER")) {
        await sleep(1000);
        window.__autoTypespeedEnabled = false;
        continue;
      }
      await type(payload, charDelay);
      console.log(payload);
      sendkey("Enter");
      await sleep(lineDelay);
    }
  } finally {
    loopActive = false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
