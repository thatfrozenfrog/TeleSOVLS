export function applyTheme(
  fontName = "'Courier New', Courier, monospace",
  fg = "#202124",
  bg = "#f5f5f5",
  cursorColor = "#1a73e8",
) {
  const setStyle = (el, styles) => {
    if (!el) return;
    Object.assign(el.style, styles);
  };

  setStyle(document.body, {
    backgroundColor: bg,
    fontFamily: fontName,
  });

  const bgSelectors = [
    ".xterm-viewport",
    'div[dir="ltr"].terminal',
    ".xterm-screen",
  ];
  bgSelectors.forEach((sel) =>
    setStyle(document.querySelector(sel), { backgroundColor: bg }),
  );

  setStyle(document.querySelector(".xterm-rows"), {
    color: fg,
    fontFamily: fontName,
  });

  const termInstance = window.i || window.term || window.terminal;
  if (termInstance && termInstance.options) {
    termInstance.options.fontFamily = fontName;
    if (termInstance.options.theme) {
      Object.assign(termInstance.options.theme, {
        background: bg,
        foreground: fg,
        cursor: cursorColor,
      });
    }
  }

  const replacements = [
    [/color:\s*#00ff00/gi, "color: " + cursorColor],
    [/color:\s*#0f0/gi, "color: " + cursorColor],
    [/color:\s*rgb\(0,\s*255,\s*0\)/gi, "color: " + cursorColor],
    [/background-color:\s*#00ff00/gi, "background-color: " + cursorColor],
    [/background-color:\s*#0f0/gi, "background-color: " + cursorColor],
    [/background-color:\s*#000000/gi, "background-color: " + cursorColor],
    [/background-color:\s*#000/gi, "background-color: " + cursorColor],
    [
      /background-color:\s*rgb\(0,\s*0,\s*0\)/gi,
      "background-color: " + cursorColor,
    ],
  ];

  document.querySelectorAll("style").forEach((styleEl) => {
    try {
      if (
        !styleEl.textContent ||
        !styleEl.textContent.includes("xterm-dom-renderer-owner")
      )
        return;
      let txt = styleEl.textContent;
      for (const [re, rep] of replacements) txt = txt.replace(re, rep);
      styleEl.textContent = txt;
    } catch (err) {}
  });

  document.querySelectorAll(".xterm-rows span").forEach((span) => {
    if (span.style.color) {
      span.style.color = fg;
    }
  });
}

export default applyTheme;
