/**
 * Get current viewport content and save as array of lines
 * @returns {string[]} Array of lines from the terminal buffer
 */
export function getViewportLines() {
  const term = window.term;
  if (!term || !term.buffer || !term.buffer.active) {
    return [];
  }

  const lines = [];
  const buffer = term.buffer.active;
  const viewportY = buffer.viewportY || 0;
  const rows = term.rows || 24;
  for (let i = viewportY; i < viewportY + rows && i < buffer.length; i++) {
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
 * Get current viewport content as string
 * @returns {string} Terminal viewport content as string
 */
export function getViewportContent() {
  const term = window.term;
  if (!term) return "";

  try {
    const lines = getViewportLines();
    return lines.join("\n");
  } catch (e) {
    return "";
  }
}

/**
 * Get the current cursor position
 * @returns {{x: number, y: number}} Cursor position (relative to viewport)
 */
export function getCursorPosition() {
  const term = window.term;
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
  const term = window.term;
  if (!term || !term.buffer || !term.buffer.active) {
    return { x: 0, y: 0 };
  }

  const buffer = term.buffer.active;
  const viewportY = buffer.viewportY || 0;

  return {
    x: buffer.cursorX,
    y: buffer.cursorY + viewportY,
  };
}

/**
 * Get the current line (where cursor is)
 * @returns {string} Current line content
 */
export function getCurrentLine() {
  const term = window.term;
  if (!term || !term.buffer || !term.buffer.active) {
    return "";
  }

  const buffer = term.buffer.active;
  const viewportY = buffer.viewportY || 0;
  const absoluteY = buffer.cursorY + viewportY;
  const line = buffer.getLine(absoluteY);

  return line ? line.translateToString(true) : "";
}
