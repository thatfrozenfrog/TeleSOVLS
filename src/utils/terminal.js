/*
terminal reader
*/
function findTerminal() {
  return window.i || window.term || window.terminal;
}

/**
 * Get current viewport content and save as array of lines
 * @returns {string[]} Array of lines from the terminal buffer
 */
export function getViewportLines() {
  const term = findTerminal();
  if (!term || !term.buffer || !term.buffer.active) {
    return [];
  }

  const lines = [];
  const buffer = term.buffer.active;

  for (let i = 0; i < buffer.length; i++) {
    const line = buffer.getLine(i);
    if (line) {
      lines.push(line.translateToString(true));
    }
  }

  return lines;
}

/**
 * Get the last n lines from the terminal viewport
 * @param {number} n - Number of lines to retrieve
 * @returns {string[]} Array of last n lines from the terminal buffer
 */
export function getLastLines(n) {
  const lines = getViewportLines();
  if (n <= 0) return [];
  return lines.slice(-n);
}

/**
 * Wait until last terminal line matches a string or timeout
 * @param {string} expected - Expected string to match
 * @param {number} timeout - Timeout in milliseconds (default: 5000ms)
 * @returns {Promise<boolean>} Promise that resolves to true if matched, false if timed out
 */
export function waitForLastLine(expected, timeout = 5000) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const check = () => {
      const lines = getLastLines(1);
      if (lines.length > 0 && lines[0].includes(expected)) {
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        resolve(false);
      } else {
        setTimeout(check, 100);
      }
    };

    check();
  });
}

/**
 * Get current viewport content as string
 * @returns {string} Terminal viewport content as string
 */
export function getViewportContent() {
  const term = findTerminal();
  if (!term) return "";

  try {
    // Get the visible selection
    const lines = getViewportLines();
    const rows = term.rows || 24;
    const viewportStart = term.buffer?.active?.viewportY || 0;

    return lines.slice(viewportStart, viewportStart + rows).join("\n");
  } catch (e) {
    return "";
  }
}

/**
 * Get the current cursor position
 * @returns {{x: number, y: number}} Cursor position (relative to viewport)
 */
export function getCursorPosition() {
  const term = findTerminal();
  if (!term || !term.buffer || !term.buffer.active) {
    return { x: 0, y: 0 };
  }

  return {
    x: term.buffer.active.cursorX,
    y: term.buffer.active.cursorY,
  };
}

/**
 * Get the absolute cursor position in the buffer
 * @returns {{x: number, y: number}} Absolute cursor position
 */
export function getAbsoluteCursorPosition() {
  const term = findTerminal();
  if (!term || !term.buffer || !term.buffer.active) {
    return { x: 0, y: 0 };
  }

  const buffer = term.buffer.active;
  const viewportY = buffer.viewportY || 0;

  return {
    x: buffer.cursorX,
    y: buffer.cursorY + viewportY, // Add viewport offset for absolute position
  };
}

/**
 * Get the current line (where cursor is)
 * @returns {string} Current line content
 */
export function getCurrentLine() {
  const term = findTerminal();
  if (!term || !term.buffer || !term.buffer.active) {
    return "";
  }

  const buffer = term.buffer.active;
  const viewportY = buffer.viewportY || 0;
  const absoluteY = buffer.cursorY + viewportY; // Convert to absolute position
  const line = buffer.getLine(absoluteY);

  return line ? line.translateToString(true) : "";
}
