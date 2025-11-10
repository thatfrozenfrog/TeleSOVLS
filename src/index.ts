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
  getLastLines,
} from "./utils/terminal";
import { solveBoard } from "./modules/2048";
import { solveAutovon } from "./modules/autovon";
import { sendkey, type } from "./utils/keyboard";
import { parseboard, autosolve, initAuto2048Tool } from "./utils/auto/auto2048";
import { initTypespeedTool } from "./utils/auto/autotypespeed";
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

    getLastLines: typeof getLastLines;
    sendkey: typeof sendkey;
    applyTheme: typeof applyTheme;
    testsend: typeof testsend;
    solveAutovon: typeof solveAutovon;
    solveBoard: typeof solveBoard;
    parseboard: typeof parseboard;
    autosolve: typeof solveBoard;
    type: typeof type;
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
      initAuto2048Tool();
      initTypespeedTool();
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
  window.sendkey = sendkey;
  window.getLastLines = getLastLines;
  //test only, remove later
  window.testsend = testsend;
  window.solveAutovon = solveAutovon;
  window.solveBoard = solveBoard;
  window.parseboard = parseboard;
  window.autosolve = autosolve;
  window.type = type;
})();
