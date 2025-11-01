import { registerTool } from "./ui.js";

function dispatchThemeEvent(type, detail) {
  try {
    const ev = new CustomEvent(type, { detail });
    window.dispatchEvent(ev);
  } catch (_) {}
}

// Theme consts
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
  Monokai: {
    fontName: "'Fira Code', monospace",
    fg: "#F8F8F2",
    bg: "#272822",
    cursorColor: "#F8F8F0",
    selectionBackground: "#49483E",
    selectionForeground: "#F8F8F2",
  },
  SolarizedDark: {
    fontName: "'Source Code Pro', monospace",
    fg: "#839496",
    bg: "#002B36",
    cursorColor: "#93A1A1",
    selectionBackground: "#073642",
    selectionForeground: "#93A1A1",
  },
  SolarizedLight: {
    fontName: "'Source Code Pro', monospace",
    fg: "#657B83",
    bg: "#FDF6E3",
    cursorColor: "#586E75",
    selectionBackground: "#EEE8D5",
    selectionForeground: "#586E75",
  },
  Dracula: {
    fontName: "'JetBrains Mono', monospace",
    fg: "#F8F8F2",
    bg: "#282A36",
    cursorColor: "#FF79C6",
    selectionBackground: "#44475A",
    selectionForeground: "#F8F8F2",
  },
  OneDark: {
    fontName: "'Fira Code', monospace",
    fg: "#ABB2BF",
    bg: "#282C34",
    cursorColor: "#528BFF",
    selectionBackground: "#3E4451",
    selectionForeground: "#ABB2BF",
  },
  GruvboxDark: {
    fontName: "'Iosevka', monospace",
    fg: "#EBDBB2",
    bg: "#282828",
    cursorColor: "#FBF1C7",
    selectionBackground: "#504945",
    selectionForeground: "#EBDBB2",
  },
  Nord: {
    fontName: "'Cascadia Code', monospace",
    fg: "#D8DEE9",
    bg: "#2E3440",
    cursorColor: "#88C0D0",
    selectionBackground: "#434C5E",
    selectionForeground: "#E5E9F0",
  },
  TomorrowNight: {
    fontName: "'Roboto Mono', monospace",
    fg: "#C5C8C6",
    bg: "#1D1F21",
    cursorColor: "#AEAFAD",
    selectionBackground: "#373B41",
    selectionForeground: "#C5C8C6",
  },
  AyuMirage: {
    fontName: "'IBM Plex Mono', monospace",
    fg: "#CBCCC6",
    bg: "#1F2430",
    cursorColor: "#FFCC66",
    selectionBackground: "#34394A",
    selectionForeground: "#CBCCC6",
  },
  TokyoNight: {
    fontName: "'JetBrains Mono', monospace",
    fg: "#C0CAF5",
    bg: "#1A1B26",
    cursorColor: "#A9B1D6",
    selectionBackground: "#33467C",
    selectionForeground: "#C0CAF5",
  },

  // --- Light themes below ---
  GitHubLight: {
    fontName: "'Consolas', monospace",
    fg: "#24292E",
    bg: "#FFFFFF",
    cursorColor: "#0969DA",
    selectionBackground: "#BBDFFF",
    selectionForeground: "#000000",
  },
  OneLight: {
    fontName: "'Fira Code', monospace",
    fg: "#383A42",
    bg: "#FAFAFA",
    cursorColor: "#526FFF",
    selectionBackground: "#E5E9FF",
    selectionForeground: "#383A42",
  },
  VSCodeLight: {
    fontName: "'Cascadia Code', monospace",
    fg: "#1E1E1E",
    bg: "#FFFFFF",
    cursorColor: "#000000",
    selectionBackground: "#ADD6FF",
    selectionForeground: "#000000",
  },
  GruvboxLight: {
    fontName: "'Iosevka', monospace",
    fg: "#3C3836",
    bg: "#FBF1C7",
    cursorColor: "#7C6F64",
    selectionBackground: "#D5C4A1",
    selectionForeground: "#3C3836",
  },
  SolarizedSoftLight: {
    fontName: "'Source Code Pro', monospace",
    fg: "#586E75",
    bg: "#FDF6E3",
    cursorColor: "#657B83",
    selectionBackground: "#EEE8D5",
    selectionForeground: "#586E75",
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

  // Notify listeners that terminal theme/colors were applied
  dispatchThemeEvent("th:theme-updated", {
    fontName,
    fg,
    bg,
    cursorColor,
    selectionBackground,
    selectionForeground,
  });
}

export default applyTheme;

/**
 * Change the active theme by name and save to localStorage.
 */
export function changeTheme(themeName) {
  const theme = THEMES[themeName];
  if (theme) {
    // Inform listeners we're about to apply a theme
    dispatchThemeEvent("th:theme-applying", { name: themeName, theme });
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

    // Inform listeners the theme application finished
    dispatchThemeEvent("th:theme-applied", { name: themeName, theme });
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

// Convenience listeners/promises for consumers
export function onThemeApplying(listener) {
  try {
    window.addEventListener("th:theme-applying", listener);
  } catch (_) {}
}
export function onThemeApplied(listener) {
  try {
    window.addEventListener("th:theme-applied", listener);
  } catch (_) {}
}
export function waitForThemeApplied(timeout = 8000) {
  return new Promise((resolve, reject) => {
    let timer;
    const handler = (ev) => {
      try {
        window.removeEventListener("th:theme-applied", handler);
      } catch (_) {}
      if (timer) clearTimeout(timer);
      resolve(ev && ev.detail ? ev.detail : undefined);
    };
    try {
      window.addEventListener("th:theme-applied", handler, { once: true });
    } catch (_) {
      window.addEventListener("th:theme-applied", handler);
    }
    if (timeout) {
      timer = setTimeout(() => {
        try {
          window.removeEventListener("th:theme-applied", handler);
        } catch (_) {}
        reject(new Error("theme apply timeout"));
      }, timeout);
    }
  });
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
