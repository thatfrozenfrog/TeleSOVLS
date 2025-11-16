import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import { registerTool } from "../ui.js";
import { registerToggleTool } from "../ui.js";

let checkboxelem = null;
let loopActive = false;
function setAutoporthackenabled(enabled) {
  if (typeof window !== "undefined") {
    window.__autoporthackenabled = enabled;
  }
  if (checkboxelem && checkboxelem.checked !== enabled) {
    checkboxelem.checked = enabled;
  }
  if (enabled) {
    autoPorthack().catch((error) => {
      console.error("[autoporthack] failed", error);
    });
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function initporthackui() {
  const { checkbox, content } = registerToggleTool({
    title: "Auto Porthack:",
    id: "th-auto-porthack",
    toggleId: "th-auto-porthack-toggle",
    onToggleChange: (checked) => {
      setAutoporthackenabled(checked);
    },
  });
  checkboxelem = checkbox;

  const version = document.createElement("div");
  version.className = "th-inline-radio";
  const versions = [
    { text: "V1", value: "v1", checked: true },
    { text: "V2", value: "v2", checked: false },
  ];
  versions.forEach(({ text: labelText, value, checked }) => {
    const wrapper = document.createElement("label");
    wrapper.className = "th-choice";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "th-auto-porthack-version";
    input.value = value;
    input.checked = checked;
    input.addEventListener("change", () => {
      if (input.checked) {
        window.__autoporthackversion = value;
      }
    });

    const text = document.createElement("span");
    text.textContent = labelText;

    wrapper.append(input, text);
    version.append(wrapper);
  });

  if (!window.__autoporthackversion) {
    window.__autoporthackversion = "v1";
  }

  content.appendChild(version);
  setAutoporthackenabled(checkbox.checked);
}

async function autoPorthack() {
  let socket = window.socket;

  if (loopActive) {
    return;
  }

  loopActive = true;
  try {
    while (window.__autoporthackenabled) {
      if (terminal.getCurrentLine().includes("port to try?")) {
        const version = window.__autoporthackversion || "v1";

        if (version === "v1") {
          console.log("[autoporthack] version v1 selected");
          let nport = 1;
          let cur = ["-"];
          await terminal.waitUntil("port to try?");
          console.log("[autoporthack] detected port prompt");
          while (cur[0].includes("port service") == false || nport > 20) {
            cur = terminal.getLastLines(nport);
            nport += 1;
            await sleep(10);
          }
          console.log("[autoporthack] collected port lines:", cur);
          const ports = cur
            .map((str) => {
              const match = str.match(/\d+/g);
              return match ? match[0] : null;
            })
            .filter((port) => port !== null);
          console.log("[autoporthack] detected ports:", ports);
          ports.sort((a, b) => {
            const priority = { 513: 1, 21: 2 };
            const pa = priority[a] || 999;
            const pb = priority[b] || 999;
            if (pa !== pb) return pa - pb;
            return Number(a) - Number(b);
          });
          for (const port of ports) {
            socket.send(port);
            keyboard.sendkey("Enter");
            await sleep(700);
            while (
              terminal.getLastLines(3)[0].includes("...try another port") ==
                false &&
              terminal.getLastLines(3)[0].includes("security compromised *") ==
                false
            ) {
              await sleep(50);
            }
            if (
              terminal.getLastLines(3)[0].includes("security compromised *")
            ) {
              console.log("[autoporthack] successfully hacked port", port);
              break;
            } else {
              console.log("[autoporthack] port", port, "failed, trying next");
              await terminal.waitUntil("port to try?");
            }
          }
        }
      }
      await sleep(250);
    }
  } finally {
    loopActive = false;
  }
}
