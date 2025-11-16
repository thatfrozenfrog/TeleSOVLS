import { changeTheme } from "../utils/theme";
import { initAuto2048Tool } from "./auto/auto2048";
import { initTypespeedTool } from "./auto/autotypespeed";
import { applyTheme } from "../utils/theme";
import { initThemeTool } from "../utils/theme";
import { initporthackui } from "./auto/autoporthack";
export function initUI() {
  initThemeTool();
  initAuto2048Tool();
  initTypespeedTool();
  initporthackui();
  ensureSweetAlertFont();
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
