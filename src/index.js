/**
 * Main entry point for Telehack userscript
 */
import { applyTheme, changeTheme, initThemeTool } from "./utils/theme.js";
import {
  getViewportContent,
  getViewportLines,
  getCurrentLine,
  getCursorPosition,
  getAbsoluteCursorPosition,
  getLastLines,
} from "./utils/terminal.js";
import { solveBoard } from "./modules/2048.js";
import { solveAutovon } from "./modules/autovon.js";
import { sendkey, type } from "./utils/keyboard.js";
import {
  parseboard,
  autosolve,
  initAuto2048Tool,
} from "./utils/auto/auto2048.js";
import { initTypespeedTool } from "./utils/auto/autotypespeed.js";

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
  const RealWS = window.WebSocket;

  class HookedWebSocket extends RealWS {
    constructor(url, protocols) {
      super(url, protocols);

      const captured =
        window.__capturedSockets ?? (window.__capturedSockets = []);
      captured.push(this);

      if (!window.n) {
        window.n = this;
      }

      if (!window.socket) {
        window.socket = this;
      }

      console.log("[hook] captured", this.url);
    }
  }
  window.WebSocket = HookedWebSocket;

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
  // test only, remove later
  window.testsend = testsend;
  window.solveAutovon = solveAutovon;
  window.solveBoard = solveBoard;
  window.parseboard = parseboard;
  window.autosolve = autosolve;
  window.type = type;
})();
