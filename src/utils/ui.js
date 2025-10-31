// Toolbar state
let toolbarInitialized = false;
let toolbarElement = null;
let hamburgerButton = null;
const registeredTools = [];

/**
 * Initialize the toolbar infrastructure (hamburger button and container).
 * Called automatically when the first tool is registered.
 */
function initializeToolbar() {
  if (toolbarInitialized) return;
  toolbarInitialized = true;

  toolbarInitialized = true;

  // Inject base styles for hamburger and toolbar
  if (!document.getElementById("th-ui-styles")) {
    const style = document.createElement("style");
    style.id = "th-ui-styles";
    style.textContent = `
      /* Hamburger button: black bg, green fg, green outline and outer glow */
      .th-hamburger{width:44px;height:44px;border-radius:8px;border:1px solid #39ff14;background:#000;color:#39ff14;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 0 10px rgba(57,255,20,0.28);transition:box-shadow .2s,transform .12s;font-size:14px}
      .th-hamburger:focus{outline:2px solid rgba(57,255,20,0.28);outline-offset:2px}
      .th-hamburger.glow{animation:th-glow 2.2s infinite}
      @keyframes th-glow{0%{box-shadow:0 0 8px rgba(57,255,20,0.25)}50%{box-shadow:0 0 22px rgba(57,255,20,0.95)}100%{box-shadow:0 0 8px rgba(57,255,20,0.25)}}
      /* center the middle hamburger stroke vertically */
      .th-hamburger-box{display:inline-flex;width:18px;height:14px;position:relative;align-items:center;justify-content:center}
      .th-hamburger-inner,.th-hamburger-inner::before,.th-hamburger-inner::after{width:18px;height:2px;background:currentColor;display:block;border-radius:2px;position:relative;transition:transform .18s,opacity .18s}
      .th-hamburger-inner::before,.th-hamburger-inner::after{content:'';position:absolute;left:0}
      .th-hamburger-inner::before{top:-6px}
      .th-hamburger-inner::after{top:6px}
      .th-hamburger.open .th-hamburger-inner{transform:rotate(45deg)}
      .th-hamburger.open .th-hamburger-inner::before{transform:rotate(-90deg);top:0}
      .th-hamburger.open .th-hamburger-inner::after{opacity:0}

      /* Toolbar positioned bottom-right; align bottoms so only X shifts when panel appears */
      .th-toolbar{position:fixed;right:10px;bottom:10px;z-index:2147483647;display:flex;align-items:flex-end;gap:8px;pointer-events:auto}
      .th-tool-panel{background:rgba(255,255,255,0.95);border:1px solid #dadce0;padding:12px;border-radius:8px;font-family:'Segoe UI', Arial, sans-serif;font-size:13px;min-width:200px;box-shadow:0 2px 10px rgba(0,0,0,0.12);align-self:flex-end;display:none}
      .th-tool-panel label{font-weight:500;color:#202124;font-size:13px;display:block;margin-bottom:8px}
      .th-tool-panel select{padding:8px;border:1px solid #dadce0;border-radius:4px;background:#fff;color:#202124;font-family:inherit;font-size:13px;cursor:pointer;width:100%}
    `;
    document.head.appendChild(style);
  }

  // Create toolbar container
  toolbarElement = document.createElement("div");
  toolbarElement.id = "th-toolbar";
  toolbarElement.className = "th-toolbar";

  // Create hamburger button
  hamburgerButton = document.createElement("button");
  hamburgerButton.id = "th-hamburger";
  hamburgerButton.className = "th-hamburger glow";
  hamburgerButton.type = "button";
  hamburgerButton.setAttribute("aria-expanded", "false");
  hamburgerButton.setAttribute("aria-label", "Open toolbar");
  hamburgerButton.innerHTML = `<span class="th-hamburger-box"><span class="th-hamburger-inner"></span></span>`;

  // Hamburger click handler
  hamburgerButton.addEventListener("click", (ev) => {
    ev.stopPropagation();
    toggleToolbar();
  });

  // Close toolbar when clicking outside
  document.addEventListener("click", () => {
    if (isToolbarOpen()) closeToolbar();
  });

  // Close toolbar on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isToolbarOpen()) closeToolbar();
  });

  // Append hamburger to toolbar and toolbar to body
  toolbarElement.appendChild(hamburgerButton);
  document.body.appendChild(toolbarElement);
}

/**
 * Check if any tool panel is currently visible.
 */
function isToolbarOpen() {
  return registeredTools.some((tool) => tool.panel.style.display !== "none");
}

/**
 * Open the toolbar (show all tool panels).
 */
function openToolbar() {
  registeredTools.forEach((tool) => {
    tool.panel.style.display = "block";
  });
  hamburgerButton.classList.add("open");
  hamburgerButton.setAttribute("aria-expanded", "true");
}

/**
 * Close the toolbar (hide all tool panels).
 */
function closeToolbar() {
  registeredTools.forEach((tool) => {
    tool.panel.style.display = "none";
  });
  hamburgerButton.classList.remove("open");
  hamburgerButton.setAttribute("aria-expanded", "false");
}

/**
 * Toggle toolbar open/closed.
 */
function toggleToolbar() {
  if (isToolbarOpen()) {
    closeToolbar();
  } else {
    openToolbar();
  }
}

/**
 * Register a new tool with the toolbar.
 * @param {Object} options - Tool configuration
 * @param {string} options.id - Unique ID for the tool panel
 * @param {HTMLElement} options.content - The content/element to display in the tool panel
 * @param {Function} [options.onInit] - Optional callback after panel is added to DOM
 * @returns {HTMLElement} The created panel element
 */
export function registerTool({ id, content, onInit }) {
  // Initialize toolbar if not already done
  if (!toolbarInitialized) {
    initializeToolbar();
  }

  // Check if tool already registered
  if (registeredTools.some((tool) => tool.id === id)) {
    console.warn(`Tool with id "${id}" is already registered.`);
    return registeredTools.find((tool) => tool.id === id).panel;
  }

  // Create tool panel
  const panel = document.createElement("div");
  panel.id = id;
  panel.className = "th-tool-panel";
  panel.style.display = "none";

  // Add content
  if (content instanceof HTMLElement) {
    panel.appendChild(content);
  } else if (typeof content === "string") {
    panel.innerHTML = content;
  }

  // Prevent clicks inside panel from closing toolbar
  panel.addEventListener("click", (ev) => ev.stopPropagation());

  // Insert panel before the hamburger button (so panels appear to the left)
  toolbarElement.insertBefore(panel, hamburgerButton);

  // Register tool
  registeredTools.push({ id, panel });

  // Call initialization callback if provided
  if (typeof onInit === "function") {
    onInit(panel);
  }

  return panel;
}

/**
 * Legacy function for backward compatibility.
 * Initializes the toolbar (now happens automatically on first registerTool call).
 */
export function createUI() {
  if (!toolbarInitialized) {
    initializeToolbar();
  }
}
