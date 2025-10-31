/**
 * Main entry point for Telehack userscript
 */

import { changeTheme, createUI } from "./utils/ui";
import { applyTheme } from "./utils/theme.js";
import { press, type, SpecialKeys } from "./utils/keyboard";
import {
  getViewportContent,
  getViewportLines,
  getCurrentLine,
  getCursorPosition,
  getAbsoluteCursorPosition,
} from "./utils/terminal";
import { create } from "domain";

declare global {
  interface Window {
    i?: any;
    term?: any;
    terminal?: any;
    // API functions
    press: typeof press;
    type: typeof type;
    SpecialKeys: typeof SpecialKeys;
    getViewportContent: typeof getViewportContent;
    getViewportLines: typeof getViewportLines;
    getCurrentLine: typeof getCurrentLine;
    getCursorPosition: typeof getCursorPosition;
    getAbsoluteCursorPosition: typeof getAbsoluteCursorPosition;
    applyTheme: typeof applyTheme;
  }
}

function loadFonts() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap";
  link.id = "jetbrains-mono-font";
  document.head.appendChild(link);
}

(function () {
  "use strict";

  function waitReady() {
    loadFonts();
    if (document.querySelector(".xterm-helper-textarea") || window.i) {
      //      applyTheme();
      createUI();
      changeTheme("Casual");
    } else {
      setTimeout(waitReady, 250);
    }
  }

  waitReady();

  window.press = press;
  window.type = type;
  window.SpecialKeys = SpecialKeys;
  window.getViewportContent = getViewportContent;
  window.getViewportLines = getViewportLines;
  window.getCurrentLine = getCurrentLine;
  window.getCursorPosition = getCursorPosition;
  window.getAbsoluteCursorPosition = getAbsoluteCursorPosition;
  window.applyTheme = applyTheme;
})();
