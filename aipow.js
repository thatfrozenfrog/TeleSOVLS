// ==UserScript==
// @name         Telehack: Type into terminal (char-by-char)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Type a string into Telehack's xterm by simulating characters one-by-one (input+keydown/keypress/keyup events)
// @match        https://telehack.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  // UI
  function createUI() {
    if (document.getElementById("th-type-ui")) return;
    const box = document.createElement("div");
    box.id = "th-type-ui";
    Object.assign(box.style, {
      position: "fixed",
      right: "10px",
      bottom: "10px",
      zIndex: 2147483647,
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
        <label style="font-size:11px">ms/char:<input id="th-type-speed" type="number" value="60" min="5" style="width:64px;margin-left:6px;background:#001000;border:1px solid #003000;color:#0f0;border-radius:4px;padding:3px;text-align:center"></label>
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

    box.querySelector("#th-type-start").addEventListener("click", () => {
      const s = box.querySelector("#th-type-input").value || "";
      const ms = Number(box.querySelector("#th-type-speed").value) || 60;
      typeIntoTerminal(s, { delay: ms, sendEnter: false });
    });
    box.querySelector("#th-type-enter").addEventListener("click", () => {
      const s = box.querySelector("#th-type-input").value || "";
      const ms = Number(box.querySelector("#th-type-speed").value) || 60;
      typeIntoTerminal(s, { delay: ms, sendEnter: true });
    });
    box
      .querySelector("#th-type-close")
      .addEventListener("click", () => box.remove());

    // Arrow keys
    box
      .querySelector("#th-arrow-up")
      .addEventListener("click", () => sendSpecialKey("ArrowUp", 38));
    box
      .querySelector("#th-arrow-down")
      .addEventListener("click", () => sendSpecialKey("ArrowDown", 40));
    box
      .querySelector("#th-arrow-left")
      .addEventListener("click", () => sendSpecialKey("ArrowLeft", 37));
    box
      .querySelector("#th-arrow-right")
      .addEventListener("click", () => sendSpecialKey("ArrowRight", 39));
    box
      .querySelector("#th-backspace")
      .addEventListener("click", () => sendSpecialKey("Backspace", 8));

    // Control keys
    box
      .querySelector("#th-ctrl-d")
      .addEventListener("click", () => sendControlKey("d", 4));
    box
      .querySelector("#th-ctrl-c")
      .addEventListener("click", () => sendControlKey("c", 3));
    box
      .querySelector("#th-ctrl-t")
      .addEventListener("click", () => sendControlKey("t", 20));
    box
      .querySelector("#th-ctrl-r")
      .addEventListener("click", () => sendControlKey("r", 18));
  }

  // small sleep helper
  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // create KeyboardEvent with reasonable props
  function makeKeyEvent(type, char, code, modifiers = {}) {
    // For keyCode/which, handle special keys
    let keyCodeValue = 0;
    if (char === "Enter" || char === "\n" || char === "\r") {
      keyCodeValue = 13;
    } else if (char && char.length === 1) {
      const upperChar = char.toUpperCase();
      keyCodeValue = upperChar.charCodeAt(0);
    }

    const base = {
      key: char,
      code: code || "",
      bubbles: true,
      cancelable: true,
      composed: true,
      // legacy - use proper keyCode values
      keyCode: keyCodeValue,
      which: keyCodeValue,
      ...modifiers,
    };
    try {
      return new KeyboardEvent(type, base);
    } catch (e) {
      // older fallback
      const ev = document.createEvent("KeyboardEvent");
      try {
        ev.initKeyboardEvent(
          type,
          true,
          true,
          window,
          base.key,
          0,
          "",
          false,
          "",
        );
      } catch (e2) {}
      return ev;
    }
  }

  // Helper to map character to code (basic ASCII)
  function charToCode(ch) {
    if (!ch) return "";
    const c = ch.toUpperCase();
    if (c >= "A" && c <= "Z") return "Key" + c;
    if (c >= "0" && c <= "9") return "Digit" + c;
    if (ch === " ") return "Space";
    if (ch === "\n" || ch === "\r") return "Enter";
    return "";
  }

  // Send special keys (arrows, backspace, etc.)
  function sendSpecialKey(key, keyCode) {
    let textarea = document.querySelector(".xterm-helper-textarea");
    if (!textarea) {
      const alt =
        document.querySelector(".xterm textarea") ||
        document.querySelector("textarea");
      if (alt) textarea = alt;
    }
    if (!textarea) return alert("Terminal input element not found.");

    try {
      textarea.focus();
    } catch (e) {}

    const base = {
      key: key,
      code: key,
      bubbles: true,
      cancelable: true,
      composed: true,
      keyCode: keyCode,
      which: keyCode,
    };

    const kd = new KeyboardEvent("keydown", base);
    const ku = new KeyboardEvent("keyup", base);

    textarea.dispatchEvent(kd);
    textarea.dispatchEvent(ku);
  }

  // Send control key combinations
  function sendControlKey(char, ctrlCode) {
    let textarea = document.querySelector(".xterm-helper-textarea");
    if (!textarea) {
      const alt =
        document.querySelector(".xterm textarea") ||
        document.querySelector("textarea");
      if (alt) textarea = alt;
    }
    if (!textarea) return alert("Terminal input element not found.");

    try {
      textarea.focus();
    } catch (e) {}

    const upperChar = char.toUpperCase();
    const base = {
      key: char,
      code: "Key" + upperChar,
      bubbles: true,
      cancelable: true,
      composed: true,
      keyCode: upperChar.charCodeAt(0),
      which: upperChar.charCodeAt(0),
      ctrlKey: true,
      metaKey: false,
      shiftKey: false,
      altKey: false,
    };

    const kd = new KeyboardEvent("keydown", base);
    const kp = new KeyboardEvent("keypress", base);
    const ku = new KeyboardEvent("keyup", base);

    textarea.dispatchEvent(kd);
    textarea.dispatchEvent(kp);
    textarea.dispatchEvent(ku);

    // Also send the control character as data
    const ctrlChar = String.fromCharCode(ctrlCode);
    const inputEv = new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      data: ctrlChar,
      composed: true,
    });
    textarea.value = ctrlChar;
    textarea.dispatchEvent(inputEv);

    setTimeout(() => {
      try {
        textarea.value = "";
      } catch (e) {}
    }, 10);
  }

  // Primary typing function
  async function typeIntoTerminal(text, options = {}) {
    const delay = typeof options.delay === "number" ? options.delay : 60;
    const sendEnter = !!options.sendEnter;

    // find the xterm helper textarea
    let textarea = document.querySelector(".xterm-helper-textarea");
    if (!textarea) {
      const alt =
        document.querySelector(".xterm textarea") ||
        document.querySelector("textarea");
      if (alt) textarea = alt;
    }
    if (!textarea) return alert("Terminal input element not found.");

    // focus
    try {
      textarea.focus();
    } catch (e) {}

    // Some attach addons clear textarea immediately after input; to be safe, we'll append characters then dispatch events
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];

      // Append char to textarea.value (many AttachAddons read value on input)
      textarea.value = (textarea.value || "") + ch;

      // Dispatch InputEvent so AttachAddon notices
      const inputEv = new InputEvent("input", {
        bubbles: true,
        cancelable: true,
        data: ch,
        composed: true,
      });
      textarea.dispatchEvent(inputEv);

      // Dispatch keydown, keypress, keyup sequence for this char
      const code = charToCode(ch);
      const kd = makeKeyEvent("keydown", ch, code);
      textarea.dispatchEvent(kd);

      // Many handlers also listen for keypress/char
      const kp = makeKeyEvent("keypress", ch, code);
      textarea.dispatchEvent(kp);

      const ku = makeKeyEvent("keyup", ch, code);
      textarea.dispatchEvent(ku);

      // small delay between chars
      await sleep(delay);
    }

    // Optionally send Enter
    if (sendEnter) {
      // set textarea to include newline if remote expects it in value, but most attach addons send Enter on key event
      // Dispatch Enter keydown/keypress/keyup
      const kdEnter = makeKeyEvent("keydown", "Enter", "Enter");
      const kpEnter = makeKeyEvent("keypress", "Enter", "Enter");
      const kuEnter = makeKeyEvent("keyup", "Enter", "Enter");
      textarea.dispatchEvent(kdEnter);
      textarea.dispatchEvent(kpEnter);
      textarea.dispatchEvent(kuEnter);

      // clear textarea.value after short delay (AttachAddon often clears it itself)
      setTimeout(() => {
        try {
          textarea.value = "";
          textarea.dispatchEvent(
            new InputEvent("input", {
              bubbles: true,
              cancelable: true,
              data: "",
              composed: true,
            }),
          );
        } catch (e) {}
      }, 30);
    }
  }

  // Wait for terminal or textarea, then show UI
  function waitReady() {
    if (document.querySelector(".xterm-helper-textarea") || window.i) {
      createUI();
    } else {
      setTimeout(waitReady, 250);
    }
  }
  waitReady();

  // console helper
  window.telehackType = (s, enter = false, delay = 60) =>
    typeIntoTerminal(String(s), {
      sendEnter: Boolean(enter),
      delay: Number(delay),
    });
})();
