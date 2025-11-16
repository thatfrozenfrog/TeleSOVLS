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
import { hook } from "./utils/hook.js";
import { initUI } from "./utils/init.js";

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
  const ws = window.n;
  ws.send("primes\n");
}

function changeicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
}

(function () {
  hook();
  function waitReady() {
    loadFonts();

    if (window.i != undefined) {
      window.term = window.i;
      initUI();
      if (window.socket == undefined) {
        alert(
          "Unable to find WebSocket connection. Please hard reload that page.",
        );
        return;
      }
    } else {
      setTimeout(waitReady, 2500);
    }
  }

  waitReady();
  let text = "TELESOVLS - Actual better telehack experience - ";
  let marquee = text;

  setInterval(() => {
    marquee = marquee.slice(1) + marquee[0];
    document.title = marquee;
  }, 150);

  changeicon("https://rule34.xxx/favicon.ico?v=2");

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
