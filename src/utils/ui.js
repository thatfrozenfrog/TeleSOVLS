import { applyTheme } from "./theme.js";

export const THEMES = {
  Casual: {
    fontName: "'Arial Mono', monospace",
    fg: "#282a36",
    bg: "#f5f5f5",
    cursorColor: "#1a73e8",
  },
  Classic: {
    fontName: "'Wumpus Mono', monospace",
    fg: "#00ff00",
    bg: "#000000",
    cursorColor: "#00ff00",
  },
  Matrix: {
    fontName: "'JetBrains Mono', monospace",
    fg: "#00ff00",
    bg: "#0d0208",
    cursorColor: "#39ff14",
  },
  Dracula: {
    fontName: "'Fira Code', 'Courier New', monospace",
    fg: "#f8f8f2",
    bg: "#282a36",
    cursorColor: "#ff79c6",
  },
  Monokai: {
    fontName: "'Consolas', 'Courier New', monospace",
    fg: "#f8f8f2",
    bg: "#272822",
    cursorColor: "#f92672",
  },
  Solarized: {
    fontName: "'Monaco', 'Courier New', monospace",
    fg: "#839496",
    bg: "#002b36",
    cursorColor: "#268bd2",
  },
};

export function changeTheme(themeName) {
  const theme = THEMES[themeName];
  if (theme) {
    applyTheme(theme.fontName, theme.fg, theme.bg, theme.cursorColor);
    // Save preference to localStorage
    try {
      localStorage.setItem("th-selected-theme", themeName);
    } catch (err) {
      // ignore if localStorage is not available
    }
  }
}

export function createUI() {
  if (document.getElementById("th-theme-selector")) return;

  const box = document.createElement("div");
  box.id = "th-theme-selector";
  Object.assign(box.style, {
    position: "fixed",
    right: "10px",
    bottom: "10px",
    zIndex: "2147483647",
    background: "rgba(255, 255, 255, 0.95)",
    border: "1px solid #dadce0",
    padding: "12px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    borderRadius: "8px",
    fontSize: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    minWidth: "200px",
  });

  box.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:8px;">
      <label style="font-weight:500;color:#202124;font-size:13px;">Select Theme:</label>
      <select id="th-theme-dropdown" style="padding:8px;border:1px solid #dadce0;border-radius:4px;background:#fff;color:#202124;font-family:inherit;font-size:13px;cursor:pointer;">
        ${Object.keys(THEMES)
          .map((name) => `<option value="${name}">${name}</option>`)
          .join("")}
      </select>
    </div>
  `;
  document.body.appendChild(box);

  const dropdown = box.querySelector("#th-theme-dropdown");

  // Apply theme on change
  dropdown.addEventListener("change", (e) => {
    changeTheme(e.target.value);
  });

  // Load saved theme preference
  try {
    const savedTheme = localStorage.getItem("th-selected-theme");
    if (savedTheme && THEMES[savedTheme]) {
      dropdown.value = savedTheme;
    }
  } catch (err) {
    // ignore if localStorage is not available
  }
}
