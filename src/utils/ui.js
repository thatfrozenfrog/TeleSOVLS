/**
 * UI creation and management
 */

import { press, type, SpecialKeys } from "./keyboard";

export function createUI() {
  if (document.getElementById("th-type-ui")) return;

  const box = document.createElement("div");
  box.id = "th-type-ui";
  Object.assign(box.style, {
    position: "fixed",
    right: "10px",
    bottom: "10px",
    zIndex: "2147483647",
    background: "#000",
    color: "#0f0",
    border: "1px solid #0f0",
    padding: "8px",
    fontFamily: "monospace",
    borderRadius: "6px",
    fontSize: "13px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 0 8px rgba(0,255,0,0.06)",
  });

  box.innerHTML = `
    <div style="display:flex;gap:6px;align-items:center;">
      <input id="th-type-input" placeholder="text to type" style="min-width:220px;padding:4px;background:#001000;border:1px solid #003000;color:#0f0;border-radius:4px;font-family:monospace">
      <label style="font-size:11px">ms/char:<input id="th-type-speed" type="number" value="60" min="0" style="width:64px;margin-left:6px;background:#001000;border:1px solid #003000;color:#0f0;border-radius:4px;padding:3px;text-align:center"></label>
      <button id="th-type-start">Type</button>
      <button id="th-type-enter" title="Add Enter after typing">Type + Enter</button>
      <button id="th-type-close" title="Close" style="padding:2px 6px">✕</button>
    </div>
    <div style="display:flex;gap:4px;flex-wrap:wrap;padding-top:4px;border-top:1px solid #003000;">
      <button id="th-arrow-up" title="Arrow Up" style="padding:2px 8px">↑</button>
      <button id="th-arrow-down" title="Arrow Down" style="padding:2px 8px">↓</button>
      <button id="th-arrow-left" title="Arrow Left" style="padding:2px 8px">←</button>
      <button id="th-arrow-right" title="Arrow Right" style="padding:2px 8px">→</button>
      <button id="th-backspace" title="Backspace" style="padding:2px 8px">⌫</button>
      <span style="border-left:1px solid #003000;margin:0 4px;"></span>
      <button id="th-ctrl-d" title="Ctrl+D (EOF)" style="padding:2px 8px">^D</button>
      <button id="th-ctrl-c" title="Ctrl+C (Break)" style="padding:2px 8px">^C</button>
      <button id="th-ctrl-t" title="Ctrl+T" style="padding:2px 8px">^T</button>
      <button id="th-ctrl-r" title="Ctrl+R (Reverse search)" style="padding:2px 8px">^R</button>
    </div>
  `;
  document.body.appendChild(box);

  // Type buttons
  box.querySelector("#th-type-start").addEventListener("click", () => {
    const s = box.querySelector("#th-type-input").value || "";
    const ms = Number(box.querySelector("#th-type-speed").value) || 0;
    type(s, ms);
  });

  box.querySelector("#th-type-enter").addEventListener("click", async () => {
    const s = box.querySelector("#th-type-input").value || "";
    const ms = Number(box.querySelector("#th-type-speed").value) || 0;
    await type(s, ms);
    press("enter");
  });

  box
    .querySelector("#th-type-close")
    .addEventListener("click", () => box.remove());

  // Arrow keys
  box
    .querySelector("#th-arrow-up")
    .addEventListener("click", () => press("up"));
  box
    .querySelector("#th-arrow-down")
    .addEventListener("click", () => press("down"));
  box
    .querySelector("#th-arrow-left")
    .addEventListener("click", () => press("left"));
  box
    .querySelector("#th-arrow-right")
    .addEventListener("click", () => press("right"));
  box
    .querySelector("#th-backspace")
    .addEventListener("click", () => press("backspace"));

  // Control keys
  box
    .querySelector("#th-ctrl-d")
    .addEventListener("click", () => press("d", { ctrl: true }));
  box
    .querySelector("#th-ctrl-c")
    .addEventListener("click", () => press("c", { ctrl: true }));
  box
    .querySelector("#th-ctrl-t")
    .addEventListener("click", () => press("t", { ctrl: true }));
  box
    .querySelector("#th-ctrl-r")
    .addEventListener("click", () => press("r", { ctrl: true }));
}
