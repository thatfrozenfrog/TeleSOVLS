import { registerTool } from "./ui.js";

// Theme definitions
export const THEMES = {
  Casual: {
    fontName: "'Arial Mono', monospace",
    fg: "#202124",
    bg: "#ffffff",
    cursorColor: "#1a73e8",
    selectionBackground: "#cce0ff",
    selectionForeground: "#000000",
  },
  Classic: {
    fontName: "'Wumpus Mono', monospace",
    fg: "#00ff00",
    bg: "#000000",
    cursorColor: "#00ff00",
    selectionBackground: "#003300",
    selectionForeground: "#00ff00",
  },
  Matrix: {
    fontName: "'JetBrains Mono', monospace",
    fg: "#00ff00",
    bg: "#0d0208",
    cursorColor: "#39ff14",
    selectionBackground: "#003300",
    selectionForeground: "#00ff00",
  },
  Dracula: {
    fontName: "'Fira Code', 'Courier New', monospace",
    fg: "#f8f8f2",
    bg: "#282a36",
    cursorColor: "#ff79c6",
    selectionBackground: "#44475a",
    selectionForeground: "#f8f8f2",
  },
  Monokai: {
    fontName: "'Consolas', 'Courier New', monospace",
    fg: "#f8f8f2",
    bg: "#272822",
    cursorColor: "#f92672",
    selectionBackground: "#49483e",
    selectionForeground: "#f8f8f2",
  },
  Solarized: {
    fontName: "'Monaco', 'Courier New', monospace",
    fg: "#839496",
    bg: "#002b36",
    cursorColor: "#268bd2",
    selectionBackground: "#073642",
    selectionForeground: "#93a1a1",
  },
};

export function applyTheme(
  fontName = "'Courier New', Courier, monospace",
  fg = "#202124",
  bg = "#f5f5f5",
  cursorColor = "#1a73e8",
  selectionBackground,
  selectionForeground,
) {
  const term = window.term;
  if (!term) return;

  try {
    document.body && (document.body.style.backgroundColor = bg);
  } catch (_) {}

  const theme = {
    foreground: fg,
    background: bg,
    cursor: cursorColor,
    cursorAccent: selectionForeground || fg,
  };
  if (selectionBackground) {
    theme.selectionBackground = selectionBackground;
    theme.selection = selectionBackground; // legacy key for older xterm versions
  }
  if (selectionForeground) theme.selectionForeground = selectionForeground;

  try {
    if (typeof term.setOption === "function") {
      term.setOption("fontFamily", fontName);
      term.setOption("theme", theme);
    } else if (term.options) {
      term.options.fontFamily = fontName;
      term.options.theme = Object.assign({}, term.options.theme || {}, theme);
      if (typeof term.refresh === "function") {
        term.refresh(0, term.rows - 1);
      }
    }
  } catch (_) {}
  // Ensure DOM renderer shows the selection even if theme key is ignored
  updateSelectionCSS(
    selectionBackground || "#b3d4fc",
    selectionForeground || "#000",
  );
  scheduleRefit();
}

export default applyTheme;

/**
 * Change the active theme by name and save to localStorage.
 */
export function changeTheme(themeName) {
  const theme = THEMES[themeName];
  if (theme) {
    applyTheme(
      theme.fontName,
      theme.fg,
      theme.bg,
      theme.cursorColor,
      theme.selectionBackground,
      theme.selectionForeground,
    );

    try {
      localStorage.setItem("th-selected-theme", themeName);
    } catch (err) {}
  }
}

/**
 * Initialize and register the theme selector tool with the toolbar.
 * Call this function to add the theme selector to the hamburger menu.
 */
export function initThemeTool() {
  // Create theme selector content
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.gap = "8px";

  const label = document.createElement("label");
  label.textContent = "Select Theme:";
  label.htmlFor = "th-theme-dropdown";
  content.appendChild(label);

  const dropdown = document.createElement("select");
  dropdown.id = "th-theme-dropdown";

  // Populate dropdown with theme options
  Object.keys(THEMES).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  });

  content.appendChild(dropdown);

  // Register the tool with the toolbar
  registerTool({
    id: "th-theme-selector",
    content: content,
    onInit: (panel) => {
      const dropdown = panel.querySelector("#th-theme-dropdown");

      // Apply theme on change
      dropdown.addEventListener("change", (e) => {
        changeTheme(e.target.value);
      });

      // Load and apply saved theme preference
      try {
        const savedTheme = localStorage.getItem("th-selected-theme");
        if (savedTheme && THEMES[savedTheme]) {
          dropdown.value = savedTheme;
          changeTheme(savedTheme);
        }
      } catch (err) {
        // ignore if localStorage is not available
      }
    },
  });
}

function scheduleRefit() {
  const fire = () => {
    try {
      window.dispatchEvent(new Event("resize"));
    } catch (_) {}
  };
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      fire();
      setTimeout(fire, 50);
      setTimeout(fire, 200);
    });
  } else {
    fire();
    setTimeout(fire, 50);
    setTimeout(fire, 200);
  }
}

// Force ::selection colors for DOM renderer to ensure visible highlight
function updateSelectionCSS(bg, fg) {
  try {
    const id = "th-xterm-selection-style";
    let el = document.getElementById(id);
    const css = `.xterm-rows ::selection{background:${bg} !important;color:${fg} !important}\n.xterm-rows ::-moz-selection{background:${bg} !important;color:${fg} !important}`;
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      el.textContent = css;
      (document.head || document.documentElement).appendChild(el);
    } else if (el.textContent !== css) {
      el.textContent = css;
    }
  } catch (_) {}
}
