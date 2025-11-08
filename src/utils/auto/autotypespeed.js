import { registerTool } from "../ui.js";
import { getLastLines } from "../terminal.js";
import { sendkey } from "../keyboard.js";

let checkboxElement = null;
let loopActive = false;

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
      let current = getLastLines(24) || [];
      const statsLine = (getLastLines(1) || [])[0] || "";
      const match = (statsLine.match(/\d+/g) || []).map(Number);

      current = current.filter((line) => Boolean(line));
      current = current.slice(0, -2);
      current = current.filter((line) => !/^\s+$/.test(line));
      current = current.filter((line) => line.startsWith(" "));
      current.sort((a, b) => b.length - a.length);
      current = current.map((str) => str.split(" ").filter(Boolean));
      if (match) {
        rank = parseInt(match[1], 10);
        level = parseInt(match[2], 10) || 1;
        wpm = parseInt(match[3], 10);
        cpm = parseInt(match[4], 10);
        misses = parseInt(match[5], 10);
      }
      for (const line of current) {
        for (const word of line) {
          socket.send(word);
          sendkey("Enter");
        }
        await sleep(50);
      }
      await sleep(50);
    }
  } finally {
    loopActive = false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
