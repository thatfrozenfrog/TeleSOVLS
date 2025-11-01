/**
 * Main entry point for Telehack userscript
 */
import { hook } from "./utils/hook";
import { applyTheme, changeTheme, initThemeTool } from "./utils/theme.js";
import {
  getViewportContent,
  getViewportLines,
  getCurrentLine,
  getCursorPosition,
  getAbsoluteCursorPosition,
} from "./utils/terminal";

import { solveAutovon } from "./modules/autovon";

declare global {
  interface Window {
    i?: any;
    n?: any;
    term?: any;
    socket?: any;
    __capturedSockets?: any[];
    getViewportContent: typeof getViewportContent;
    getViewportLines: typeof getViewportLines;
    getCurrentLine: typeof getCurrentLine;
    getCursorPosition: typeof getCursorPosition;
    getAbsoluteCursorPosition: typeof getAbsoluteCursorPosition;
    sendkey: typeof sendkey;
    applyTheme: typeof applyTheme;
    testsend: typeof testsend;
    solveAutovon: typeof solveAutovon;
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

function testsend() {
  console.log("tests send");
  const ws = window.socket;
  ws.send("primes\n");
}

(function () {
  hook();

  function waitReady() {
    loadFonts();

    if (window.i != undefined) {
      window.term = window.i;
      initThemeTool();
      try {
        const savedTheme = localStorage.getItem("th-selected-theme");
        if (savedTheme && typeof savedTheme === "string") {
          changeTheme(savedTheme);
        } else {
          changeTheme("Casual");
        }
      } catch (_) {
        changeTheme("Casual");
      }
    } else {
      setTimeout(waitReady, 2500);
    }
  }

  waitReady();

  window.getViewportContent = getViewportContent;
  window.getViewportLines = getViewportLines;
  window.getCurrentLine = getCurrentLine;
  window.getCursorPosition = getCursorPosition;
  window.getAbsoluteCursorPosition = getAbsoluteCursorPosition;
  window.applyTheme = applyTheme;

  //test only, remove later
  window.testsend = testsend;
  window.solveAutovon = solveAutovon;
})();
