import { changeTheme } from "../utils/theme.js";
import { initAuto2048Tool } from "./auto/auto2048.js";
import { initTypespeedTool } from "./auto/autotypespeed.js";
import { applyTheme } from "../utils/theme.js";
import { initThemeTool } from "../utils/theme.js";
import { initporthackui } from "./auto/autoporthack.js";
import { initAutologinUI } from "./auto/autologin.js";
export function initUI() {
  initThemeTool();
  initporthackui();
  initAuto2048Tool();
  initTypespeedTool();
  initAutologinUI();

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
}
