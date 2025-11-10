import { registerTool } from "../ui.js";
import { getLastLines } from "../terminal.js";
import { sendkey } from "../keyboard.js";
import { type } from "../keyboard.js";
let checkboxElement = null;
let loopActive = false;
let charDelay = 30;
let lineDelay = 50;

function normalizeDelay(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

function createDelayInput(id, labelText, initialValue, onUpdate) {
  const wrapper = document.createElement("label");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.fontSize = "12px";
  wrapper.textContent = labelText;

  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.step = "10";
  input.value = String(initialValue);
  input.id = id;
  input.addEventListener("change", () => {
    const updated = normalizeDelay(input.value, initialValue);
    input.value = String(updated);
    onUpdate(updated);
  });

  wrapper.appendChild(input);
  return wrapper;
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
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.gap = "8px";

  const label = document.createElement("label");
  label.textContent = "Auto Typespeed:";
  label.htmlFor = "th-auto-typespeed-toggle";
  content.appendChild(label);

  const toggle = document.createElement("label");
  toggle.className = "th-switch";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "th-auto-typespeed-toggle";
  toggle.appendChild(checkbox);

  const slider = document.createElement("span");
  slider.className = "th-switch-slider";
  toggle.appendChild(slider);

  content.appendChild(toggle);

  const charDelayControl = createDelayInput(
    "th-auto-typespeed-char-delay",
    "charDelay",
    charDelay,
    (value) => {
      charDelay = value;
    },
  );
  const lineDelayControl = createDelayInput(
    "th-auto-typespeed-line-delay",
    "lineDelay",
    lineDelay,
    (value) => {
      lineDelay = value;
    },
  );

  content.appendChild(charDelayControl);
  content.appendChild(lineDelayControl);

  checkboxElement = checkbox;
  const initialEnabled =
    typeof window !== "undefined" && Boolean(window.__autoTypespeedEnabled);
  checkbox.checked = initialEnabled;
  checkbox.addEventListener("change", () => {
    setAutoTypespeedEnabled(checkbox.checked);
  });

  setAutoTypespeedEnabled(initialEnabled);

  if (typeof registerTool === "function") {
    registerTool({ id: "th-auto-typespeed", content });
  }
}

export async function autoTypespeed() {
  let socket = window.socket;
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
