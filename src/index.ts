/**
 * Main entry point for Telehack userscript
 */

import { createUI } from "./utils/ui";
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
  }
}

(function () {
  "use strict";

  function applyTheme() {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.fontFamily = "'Courier New', Courier, monospace";

    const viewport = document.querySelector(".xterm-viewport") as HTMLElement;
    if (viewport) {
      viewport.style.backgroundColor = "#f5f5f5";
    }

    const terminal = document.querySelector(
      'div[dir="ltr"].terminal',
    ) as HTMLElement;
    if (terminal) {
      terminal.style.backgroundColor = "#f5f5f5";
    }
    const screen = document.querySelector(".xterm-screen") as HTMLElement;
    if (screen) {
      screen.style.backgroundColor = "#f5f5f5";
    }

    const termInstance = window.i || window.term || window.terminal;
    if (termInstance && termInstance.options) {
      termInstance.options.fontFamily = "'Courier New', Courier, monospace";
      if (termInstance.options.theme) {
        termInstance.options.theme.background = "#f5f5f5";
        termInstance.options.theme.foreground = "#bad3fc";
        termInstance.options.theme.cursor = "#1a73e8";
      }
    }

    const styleElements = document.querySelectorAll("style");
    styleElements.forEach((styleEl) => {
      if (
        styleEl.textContent &&
        styleEl.textContent.includes("xterm-dom-renderer-owner")
      ) {
        styleEl.textContent = styleEl.textContent
          .replace(/color:\s*#00ff00/gi, "color: #1a73e8")
          .replace(/color:\s*#0f0/gi, "color: #1a73e8")
          .replace(/color:\s*rgb\(0,\s*255,\s*0\)/gi, "color: #1a73e8")
          .replace(/background-color:\s*#00ff00/gi, "background-color: #1a73e8")
          .replace(/background-color:\s*#0f0/gi, "background-color: #1a73e8")
          .replace(/background-color:\s*#000000/gi, "background-color: #1a73e8")
          .replace(/background-color:\s*#000/gi, "background-color: #1a73e8")
          .replace(
            /background-color:\s*rgb\(0,\s*0,\s*0\)/gi,
            "background-color: #1a73e8",
          );
      }
    });

    const rows = document.querySelector(".xterm-rows") as HTMLElement;
    if (rows) {
      rows.style.color = "#202124";
      rows.style.fontFamily = "'Courier New', Courier, monospace";
    }

    const spans = document.querySelectorAll(".xterm-rows span");
    spans.forEach((span: HTMLElement) => {
      if (
        span.style.color &&
        (span.style.color.includes("0, 255, 0") ||
          span.style.color === "#00ff00")
      ) {
        span.style.color = "#202124";
      }
    });
  }
  function waitReady() {
    if (document.querySelector(".xterm-helper-textarea") || window.i) {
      applyTheme();
      createUI();
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
})();
