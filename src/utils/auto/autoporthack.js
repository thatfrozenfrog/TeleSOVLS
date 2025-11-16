import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import { registerTool } from "../ui.js";
import { registerToggleTool } from "../ui.js";

let checkboxelem = null;

function setAutoporthackenabled(enabled) {
  if (typeof window !== "undefined") {
    window.__autoporthackenabled = enabled;
  }
  if (checkboxelem && checkboxelem.checked !== enabled) {
    checkboxelem.checked = enabled;
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
  ["v1", "v2"].forEach((version, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "th-auto-porthack-version";
    input.value = version;
    input.checked = index === 0;
    input.addEventListener("change", () => {
      if (input.checked) {
        window.__autoporthackversion = version;
      }
    });
    label.append(input, document.createTextNode(version.toUpperCase()));
    version.append(label);
  });

  content.appendChild(version);
  setAutoporthackenabled(checkbox.checked);
}
