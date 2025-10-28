/**
 * Keyboard input utilities - Send keystrokes to xterm terminal
 * Supports regular keys, special keys, control keys, and modifiers (like pynput)
 */

/**
 * Find the xterm textarea element
 */
function findTerminalTextarea() {
  let textarea = document.querySelector(".xterm-helper-textarea");
  if (!textarea) {
    const alt =
      document.querySelector(".xterm textarea") ||
      document.querySelector("textarea");
    if (alt) textarea = alt;
  }
  return textarea;
}

/**
 * Special key mappings
 */
const SpecialKeys = {
  enter: { key: "Enter", code: "Enter", keyCode: 13 },
  backspace: { key: "Backspace", code: "Backspace", keyCode: 8 },
  tab: { key: "Tab", code: "Tab", keyCode: 9 },
  escape: { key: "Escape", code: "Escape", keyCode: 27 },
  space: { key: " ", code: "Space", keyCode: 32 },

  // Arrow keys
  up: { key: "ArrowUp", code: "ArrowUp", keyCode: 38 },
  down: { key: "ArrowDown", code: "ArrowDown", keyCode: 40 },
  left: { key: "ArrowLeft", code: "ArrowLeft", keyCode: 37 },
  right: { key: "ArrowRight", code: "ArrowRight", keyCode: 39 },

  // Function keys
  f1: { key: "F1", code: "F1", keyCode: 112 },
  f2: { key: "F2", code: "F2", keyCode: 113 },
  f3: { key: "F3", code: "F3", keyCode: 114 },
  f4: { key: "F4", code: "F4", keyCode: 115 },
  f5: { key: "F5", code: "F5", keyCode: 116 },
  f6: { key: "F6", code: "F6", keyCode: 117 },
  f7: { key: "F7", code: "F7", keyCode: 118 },
  f8: { key: "F8", code: "F8", keyCode: 119 },
  f9: { key: "F9", code: "F9", keyCode: 120 },
  f10: { key: "F10", code: "F10", keyCode: 121 },
  f11: { key: "F11", code: "F11", keyCode: 122 },
  f12: { key: "F12", code: "F12", keyCode: 123 },

  // Other special keys
  delete: { key: "Delete", code: "Delete", keyCode: 46 },
  home: { key: "Home", code: "Home", keyCode: 36 },
  end: { key: "End", code: "End", keyCode: 35 },
  pageup: { key: "PageUp", code: "PageUp", keyCode: 33 },
  pagedown: { key: "PageDown", code: "PageDown", keyCode: 34 },
  insert: { key: "Insert", code: "Insert", keyCode: 45 },
};

/**
 * Send a keystroke to the terminal
 *
 * @param {string|object} key - Character, special key name, or key object
 * @param {object} modifiers - Modifiers: { ctrl, shift, alt, meta }
 *
 * Examples:
 *   press('a')                           // Type 'a'
 *   press('a', { shift: true })          // Type 'A'
 *   press('c', { ctrl: true })           // Ctrl+C
 *   press('enter')                       // Press Enter
 *   press(SpecialKeys.up)                // Arrow Up
 */
export function press(key, modifiers = {}) {
  const textarea = findTerminalTextarea();
  if (!textarea) {
    console.error("Terminal textarea not found");
    return false;
  }

  try {
    textarea.focus();
  } catch (e) {}

  let keyData;

  // Handle special key names
  if (typeof key === "string" && key.length > 1) {
    keyData = SpecialKeys[key.toLowerCase()];
    if (!keyData) {
      console.error(`Unknown special key: ${key}`);
      return false;
    }
  }
  // Handle key object
  else if (typeof key === "object") {
    keyData = key;
  }
  // Handle regular character
  else if (typeof key === "string" && key.length === 1) {
    const char = key;
    const upperChar = char.toUpperCase();
    const code =
      upperChar >= "A" && upperChar <= "Z"
        ? "Key" + upperChar
        : char >= "0" && char <= "9"
          ? "Digit" + char
          : "";

    keyData = {
      key: char,
      code: code,
      keyCode: upperChar.charCodeAt(0),
    };
  } else {
    console.error("Invalid key parameter");
    return false;
  }

  const eventData = {
    key: keyData.key,
    code: keyData.code,
    keyCode: keyData.keyCode,
    which: keyData.keyCode,
    bubbles: true,
    cancelable: true,
    composed: true,
    ctrlKey: !!modifiers.ctrl,
    shiftKey: !!modifiers.shift,
    altKey: !!modifiers.alt,
    metaKey: !!modifiers.meta,
  };

  // Dispatch keyboard events
  const keydown = new KeyboardEvent("keydown", eventData);
  const keypress = new KeyboardEvent("keypress", eventData);
  const keyup = new KeyboardEvent("keyup", eventData);

  textarea.dispatchEvent(keydown);

  // For regular characters, also dispatch input event
  if (
    typeof key === "string" &&
    key.length === 1 &&
    !modifiers.ctrl &&
    !modifiers.meta
  ) {
    textarea.value = (textarea.value || "") + key;
    const inputEv = new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      data: key,
      composed: true,
    });
    textarea.dispatchEvent(inputEv);
  }
  // For control characters, send the control code
  else if (modifiers.ctrl && typeof key === "string" && key.length === 1) {
    const ctrlCode = key.toUpperCase().charCodeAt(0) - 64; // A=1, C=3, D=4, etc.
    const ctrlChar = String.fromCharCode(ctrlCode);

    textarea.value = ctrlChar;
    const inputEv = new InputEvent("input", {
      bubbles: true,
      cancelable: true,
      data: ctrlChar,
      composed: true,
    });
    textarea.dispatchEvent(inputEv);

    setTimeout(() => {
      try {
        textarea.value = "";
      } catch (e) {}
    }, 10);
  }

  textarea.dispatchEvent(keypress);
  textarea.dispatchEvent(keyup);

  return true;
}

/**
 * Type a string of text (sends each character individually)
 *
 * @param {string} text - Text to type
 * @param {number} delay - Delay between keystrokes in ms (default: 0)
 */
export async function type(text, delay = 0) {
  for (let i = 0; i < text.length; i++) {
    press(text[i]);
    if (delay > 0 && i < text.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Export special keys for convenience
 */
export { SpecialKeys };
