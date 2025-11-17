const SPECIAL_KEY_SEQUENCES = {
  Backspace: "\x7F",
  Enter: "\r",
  Tab: "\t",
  Esc: "\x1b",
  // Navigation
  Up: "\x1b[A",
  Down: "\x1b[B",
  Right: "\x1b[C",
  Left: "\x1b[D",
  Home: "\x1b[H",
  End: "\x1b[F",
  "Page Up": "\x1b[5~",
  "Page Down": "\x1b[6~",
  Insert: "\x1b[2~",
  Delete: "\x1b[3~",
  // Function keys
  F1: "\x1bOP",
  F2: "\x1bOQ",
  F3: "\x1bOR",
  F4: "\x1bOS",
  F5: "\x1b[15~",
  F6: "\x1b[17~",
  F7: "\x1b[18~",
  F8: "\x1b[19~",
  F9: "\x1b[20~",
  F10: "\x1b[21~",
  F11: "\x1b[23~",
  F12: "\x1b[24~",
};

function applyCharModifiers(ch, modifiers = {}) {
  let out = ch;
  if (modifiers.ctrl && /^[A-Za-z]$/.test(out)) {
    const code = out.toUpperCase().charCodeAt(0) - 64;
    out = String.fromCharCode(code);
  }
  if (modifiers.alt) {
    out = "\x1b" + out;
  }
  return out;
}

function resolveKeyToPayload(key, modifiers = {}) {
  if (typeof key !== "string") return "";
  if (key.length === 1) {
    return applyCharModifiers(key, modifiers);
  }
  if (SPECIAL_KEY_SEQUENCES[key]) {
    const seq = SPECIAL_KEY_SEQUENCES[key];
    return modifiers && modifiers.alt ? "\x1b" + seq : seq;
  }
  return key;
}

export function sendkey(key, modifiers = {}) {
  const socket = window.socket;
  if (!socket || socket.readyState !== 1) {
    console.warn("sendkey: socket not ready", {
      socketState: socket && socket.readyState,
    });
    return;
  }
  const payload = resolveKeyToPayload(key, modifiers);
  if (!payload) return;
  socket.send(payload);
}

const keybindListeners = [];

export function registerKeybind(combo, handler) {
  if (
    !Array.isArray(combo) ||
    combo.length === 0 ||
    typeof handler !== "function"
  ) {
    return () => {};
  }
  const normalizedSet = new Set(combo.map((key) => key.toLowerCase()));

  const listener = (event) => {
    if (event.type !== "keydown") return;
    const pressed = new Set();
    if (event.shiftKey) pressed.add("shift");
    if (event.ctrlKey) pressed.add("control");
    if (event.altKey) pressed.add("alt");
    if (event.metaKey) pressed.add("meta");
    if (event.key) pressed.add(event.key.toLowerCase());

    if (normalizedSet.size !== pressed.size) return;
    for (const key of normalizedSet) {
      if (!pressed.has(key)) return;
    }
    handler(event);
  };

  keybindListeners.push(listener);
  window.addEventListener("keydown", listener);
  return () => {
    const idx = keybindListeners.indexOf(listener);
    if (idx >= 0) keybindListeners.splice(idx, 1);
    window.removeEventListener("keydown", listener);
  };
}

export async function type(text, delay = 50) {
  for (const ch of text) {
    socket.send(ch);
    await sleep(delay);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
