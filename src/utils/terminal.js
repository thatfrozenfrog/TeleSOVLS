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
  const ypos = getCursorPosition().y;
  const start = Math.max(0, ypos - n + 1);
  return lines.slice(start, ypos + 1) || [];
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

/**
 * Wait until specific text appears in the terminal
 * @param {string} text - Text to wait for
 * @param {{timeoutMs?: number, pollMs?: number}} options - Optional settings
 * @param {boolean} regex - Whether to treat text as a regex
 * @returns {Promise<boolean>} Resolves to true if text found, false if timeout
 */

export async function waitUntil(
  text,
  { timeoutMs = 5000, pollMs = 100 } = {},
  regex = false,
) {
  const start = Date.now();
  while (true) {
    const content = getCurrentLine();
    if (regex) {
      const re = new RegExp(text);
      if (re.test(content)) return true;
    } else {
      if (content.includes(text)) return true;
    }
    if (Date.now() - start > timeoutMs) return false;
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
}

export async function waitStill(timeoutMs = 500, pollMs = 50) {
  let lastContent = getViewportContent();
  const start = Date.now();
  let consecutiveStableChecks = 0;
  const requiredStableChecks = 2; // Must be stable for 2 consecutive checks
  let currentPollDelay = pollMs;

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, currentPollDelay));
    const currentContent = getViewportContent();

    if (currentContent === lastContent) {
      consecutiveStableChecks += 1;
      // Require multiple stable checks before returning
      if (consecutiveStableChecks >= requiredStableChecks) {
        return;
      }
      // Content stable, slow down polling to save resources
      currentPollDelay = Math.min(currentPollDelay * 1.5, 200);
    } else {
      // Content changed, reset stability counter and speed up polling
      consecutiveStableChecks = 0;
      currentPollDelay = Math.max(pollMs, 20); // Faster during active changes
      lastContent = currentContent;
    }

    if (Date.now() - start > timeoutMs) {
      return;
    }
  }
}
