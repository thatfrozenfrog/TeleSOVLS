// Toolbar state
let toolbarInitialized = false;
let toolbarHost = null;
let toolbarRoot = null;
let toolbarElement = null;
let hamburgerButton = null;
const registeredTools = [];
let activeDragPanel = null;
let dropPlaceholder = null;
let dragSourceId = null;
let matrixCanvas = null;
let matrixCtx = null;
let matrixDrops = [];
let matrixColumns = 0;
let matrixAnimationFrame = null;
let matrixResizeObserver = null;
let matrixLastTimestamp = 0;
let matrixBackgroundInitialized = false;

const MATRIX_CHARACTERS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split(
    "",
  );
const MATRIX_FONT_SIZE = 14;
const MATRIX_FRAME_INTERVAL = 42; // ~24 FPS for subtle motion

function createDragPlaceholder(fromPanel) {
  const placeholderEl = document.createElement("article");
  placeholderEl.className = "th-tool-panel drag-placeholder";
  placeholderEl.style.height = fromPanel.offsetHeight + "px";
  placeholderEl.style.minWidth = fromPanel.offsetWidth + "px";
  placeholderEl.dataset.open = "true";
  placeholderEl.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }
  });
  return placeholderEl;
}

function updateRegisteredOrder() {
  if (!toolbarElement) return;
  const toolsById = new Map(registeredTools.map((tool) => [tool.id, tool]));
  const orderedPanels = Array.from(
    toolbarElement.querySelectorAll(".th-tool-panel:not(.drag-placeholder)"),
  );
  const newOrder = orderedPanels
    .map((panelEl) => toolsById.get(panelEl.id))
    .filter(Boolean);
  registeredTools.length = 0;
  registeredTools.push(...newOrder);
}

function resizeMatrixCanvas() {
  if (!matrixCanvas || !toolbarElement) return;
  const rect = toolbarElement.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  if (matrixCanvas.width !== width || matrixCanvas.height !== height) {
    matrixCanvas.width = width;
    matrixCanvas.height = height;
  }

  matrixCanvas.style.width = `${width}px`;
  matrixCanvas.style.height = `${height}px`;

  const ctx = matrixCanvas.getContext("2d");
  if (!ctx) return;
  matrixCtx = ctx;

  matrixCtx.fillStyle = "rgba(0, 0, 0, 1)";
  matrixCtx.fillRect(0, 0, width, height);

  const nextColumns = Math.max(1, Math.floor(width / MATRIX_FONT_SIZE));
  const nextDrops = new Array(nextColumns);
  for (let i = 0; i < nextColumns; i++) {
    nextDrops[i] =
      matrixDrops[i] ?? Math.random() * (height / MATRIX_FONT_SIZE);
  }
  matrixColumns = nextColumns;
  matrixDrops = nextDrops;
}

function drawMatrixFrame(timestamp) {
  if (!matrixCanvas || !matrixCtx) {
    matrixAnimationFrame = requestAnimationFrame(drawMatrixFrame);
    return;
  }

  if (timestamp - matrixLastTimestamp < MATRIX_FRAME_INTERVAL) {
    matrixAnimationFrame = requestAnimationFrame(drawMatrixFrame);
    return;
  }
  matrixLastTimestamp = timestamp;

  matrixCtx.fillStyle = "rgba(3, 6, 6, 0.28)";
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  matrixCtx.fillStyle = "rgba(57, 255, 20, 0.9)";
  matrixCtx.font = `${MATRIX_FONT_SIZE}px "JetBrains Mono", "Fira Code", monospace`;

  for (let i = 0; i < matrixColumns; i++) {
    const char =
      MATRIX_CHARACTERS[Math.floor(Math.random() * MATRIX_CHARACTERS.length)];
    const x = i * MATRIX_FONT_SIZE;
    const y = matrixDrops[i] * MATRIX_FONT_SIZE;
    matrixCtx.fillText(char, x, y);

    if (y > matrixCanvas.height && Math.random() > 0.965) {
      matrixDrops[i] = 0;
    }

    matrixDrops[i] += 1;
  }

  matrixAnimationFrame = requestAnimationFrame(drawMatrixFrame);
}

function startMatrixAnimation() {
  if (matrixAnimationFrame !== null) return;
  matrixAnimationFrame = requestAnimationFrame(drawMatrixFrame);
}

function ensureMatrixBackground() {
  if (matrixBackgroundInitialized || !toolbarElement) return;
  matrixBackgroundInitialized = true;

  matrixCanvas = document.createElement("canvas");
  matrixCanvas.className = "th-matrix-canvas";
  matrixCanvas.width = 1;
  matrixCanvas.height = 1;
  toolbarElement.insertBefore(matrixCanvas, toolbarElement.firstChild || null);

  resizeMatrixCanvas();

  if (typeof ResizeObserver !== "undefined") {
    matrixResizeObserver = new ResizeObserver(() => resizeMatrixCanvas());
    matrixResizeObserver.observe(toolbarElement);
  }

  window.addEventListener("resize", resizeMatrixCanvas);
  startMatrixAnimation();
}

function handleToolbarDragOver(ev) {
  if (!dropPlaceholder || !toolbarElement) return;
  const target =
    ev.target instanceof HTMLElement
      ? ev.target.closest(".th-tool-panel")
      : null;

  if (!target) {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }
    if (hamburgerButton) {
      toolbarElement.insertBefore(dropPlaceholder, hamburgerButton);
    } else if (dropPlaceholder.parentNode !== toolbarElement) {
      toolbarElement.appendChild(dropPlaceholder);
    }
  } else if (target === dropPlaceholder) {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }
  }
}

function handleToolbarDrop(ev) {
  if (!dropPlaceholder || !activeDragPanel || !toolbarElement) return;
  const sourceId = ev.dataTransfer?.getData("text/plain") || dragSourceId;
  if (!sourceId || sourceId !== activeDragPanel.id) return;

  ev.preventDefault();
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  toolbarElement.insertBefore(activeDragPanel, dropPlaceholder);
  dropPlaceholder.remove();
  dropPlaceholder = null;

  activeDragPanel.style.removeProperty("display");
  activeDragPanel.classList.remove("dragging");

  updateRegisteredOrder();

  activeDragPanel = null;
  dragSourceId = null;
}

/**
 * Initialize the toolbar infrastructure (hamburger button and container).
 * Called automatically when the first tool is registered.
 */
function initializeToolbar() {
  if (toolbarInitialized) return;
  toolbarInitialized = true;

  toolbarHost = document.createElement("div");
  toolbarHost.id = "th-toolbar-host";
  toolbarHost.style.all = "initial";
  toolbarHost.style.position = "fixed";
  toolbarHost.style.zIndex = "2147483647";
  toolbarHost.style.bottom = "24px";
  toolbarHost.style.right = "24px";

  toolbarRoot = toolbarHost.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    :host {
      color-scheme: dark;
    }

    :host, :host * {
      box-sizing: border-box;
      font-family: "JetBrains Mono", "Fira Code", "IBM Plex Mono", monospace;
      color: #d9ffe2;
    }

    .th-toolbar {
      position: relative;
      display: inline-flex;
      gap: 0.9rem;
      align-items: flex-end;
      pointer-events: auto;
      padding: 1rem 1.15rem;
      border-radius: 28px;
      background: rgba(4, 9, 10, 0.82);
      box-shadow:
        0 22px 48px rgba(0, 0, 0, 0.7),
        inset 0 0 32px rgba(57, 255, 20, 0.08);
      overflow: hidden;
      isolation: isolate;
      border: 1px solid rgba(57, 255, 20, 0.28);
    }

    .th-toolbar > :not(.th-matrix-canvas) {
      position: relative;
      z-index: 1;
    }

    .th-matrix-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.82;
      mix-blend-mode: screen;
      z-index: 0;
    }

    .th-hamburger {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      border: 2px solid rgba(57, 255, 20, 0.85);
      background: radial-gradient(circle at 30% 30%, rgba(57,255,20,0.18), transparent 55%),
        #050909;
      color: #39ff14;
      display: grid;
      place-items: center;
      box-shadow:
        0 0 22px rgba(57, 255, 20, 0.45),
        0 0 48px rgba(57, 255, 20, 0.18),
        inset 0 0 12px rgba(16, 60, 25, 0.95);
      cursor: pointer;
      transition: transform 180ms ease, box-shadow 220ms ease;
      position: relative;
      overflow: hidden;
    }

    .th-hamburger::after {
      content: "";
      position: absolute;
      inset: -30%;
      background: radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 200ms ease;
      pointer-events: none;
    }

    .th-hamburger:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow:
        0 0 32px rgba(57, 255, 20, 0.55),
        0 0 68px rgba(57, 255, 20, 0.22),
        inset 0 0 16px rgba(16, 60, 25, 0.95);
    }

    .th-hamburger:hover::after,
    .th-hamburger:focus-visible::after {
      opacity: 1;
    }

    .th-hamburger:focus-visible {
      outline: 2px solid rgba(57, 255, 20, 0.9);
      outline-offset: 4px;
    }

    .th-hamburger-icon,
    .th-hamburger-icon::before,
    .th-hamburger-icon::after {
      content: "";
      width: 24px;
      height: 3px;
      border-radius: 6px;
      background: currentColor;
      display: block;
      transition: transform 200ms ease, opacity 200ms ease;
      position: relative;
    }

    .th-hamburger-icon::before,
    .th-hamburger-icon::after {
      position: absolute;
      left: 0;
      background: linear-gradient(90deg, rgba(57,255,20,0.25), #39ff14, rgba(57,255,20,0.25));
      box-shadow: 0 0 8px rgba(57,255,20,0.65);
    }

    .th-hamburger-icon::before { top: -8px; }
    .th-hamburger-icon::after { top: 8px; }

    .th-hamburger.open .th-hamburger-icon {
      transform: rotate(45deg);
    }

    .th-hamburger.open .th-hamburger-icon::before {
      transform: rotate(-90deg);
      top: 0;
    }

    .th-hamburger.open .th-hamburger-icon::after {
      opacity: 0;
    }

    .th-tool-panel {
      display: none;
      min-width: 270px;
      padding: 1.25rem 1.5rem;
      border-radius: 18px;
      background: linear-gradient(145deg, rgba(7, 14, 16, 0.94), rgba(4, 9, 11, 0.98));
      border: 1px solid rgba(57, 255, 20, 0.35);
      box-shadow:
        0 18px 32px rgba(0, 0, 0, 0.65),
        0 0 28px rgba(57, 255, 20, 0.18);
      backdrop-filter: blur(8px);
      color: #d9ffe2;
    }

    .th-tool-panel[data-open="true"] {
      display: block;
      animation: th-panel-in 160ms ease;
    }

    .th-tool-panel.dragging {
      opacity: 0.5;
      transform: scale(0.98);
    }

    .th-tool-panel.drag-placeholder {
      border: 2px dashed rgba(57, 255, 20, 0.75);
      background: linear-gradient(145deg, rgba(7, 14, 16, 0.45), rgba(4, 9, 11, 0.5));
      box-shadow: 
        0 0 32px rgba(57, 255, 20, 0.35),
        inset 0 0 24px rgba(57, 255, 20, 0.12);
      animation: th-placeholder-pulse 1.2s ease-in-out infinite;
    }

    @keyframes th-placeholder-pulse {
      0%, 100% {
        border-color: rgba(57, 255, 20, 0.75);
        box-shadow: 
          0 0 32px rgba(57, 255, 20, 0.35),
          inset 0 0 24px rgba(57, 255, 20, 0.12);
      }
      50% {
        border-color: rgba(57, 255, 20, 0.95);
        box-shadow: 
          0 0 42px rgba(57, 255, 20, 0.45),
          inset 0 0 32px rgba(57, 255, 20, 0.18);
      }
    }

    .th-tool-handle {
      width: 100%;
      height: 14px;
      margin-bottom: 0.9rem;
      background-image: radial-gradient(circle, rgba(57,255,20,0.65) 20%, transparent 25%);
      background-size: 10px 10px;
      background-position: 0 0;
      opacity: 0.65;
      border-radius: 999px;
      cursor: grab;
      transition: opacity 180ms ease;
    }

    .th-tool-handle:hover {
      opacity: 1;
    }

    .th-tool-handle:active {
      cursor: grabbing;
    }

    .th-tool-panel h2,
    .th-tool-panel h3 {
      margin-top: 0;
      margin-bottom: 0.9rem;
      font-size: 1rem;
      font-weight: 600;
      color: #72ff6b;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .th-tool-panel label {
      font-weight: 600;
      font-size: 0.85rem;
      color: rgba(183, 255, 205, 0.88);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .th-tool-panel button,
    .th-tool-panel select,
    .th-tool-panel input,
    .th-tool-panel textarea {
      width: 100%;
      margin-top: 0.35rem;
      background: rgba(8, 20, 12, 0.9);
      color: #d7ffe2;
      border: 1px solid rgba(57, 255, 20, 0.45);
      border-radius: 12px;
      padding: 0.55rem 0.75rem;
      font-size: 0.9rem;
      box-shadow:
        inset 0 0 18px rgba(24, 68, 35, 0.65),
        0 0 12px rgba(57, 255, 20, 0.18);
      transition: border-color 180ms ease, box-shadow 180ms ease, transform 120ms ease;
    }

    .th-tool-panel button:hover,
    .th-tool-panel select:hover,
    .th-tool-panel input:hover,
    .th-tool-panel textarea:hover {
      border-color: rgba(57, 255, 20, 0.75);
      box-shadow:
        inset 0 0 22px rgba(24, 84, 44, 0.75),
        0 0 18px rgba(57, 255, 20, 0.22);
      transform: translateY(-1px);
    }

    .th-tool-panel button:active {
      transform: scale(0.98);
    }

    .th-tool-panel button.primary,
    .th-tool-panel button,
    .th-tool-panel button[type="button"],
    .th-tool-panel button[type="submit"] {
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    .th-tool-panel small,
    .th-tool-panel p {
      color: rgba(207, 255, 223, 0.8);
      font-size: 0.82rem;
      line-height: 1.5;
    }

    @keyframes th-panel-in {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;
  toolbarRoot.appendChild(style);

  // Create toolbar container
  toolbarElement = document.createElement("div");
  toolbarElement.id = "th-toolbar";
  toolbarElement.className = "th-toolbar";
  toolbarElement.addEventListener("dragover", handleToolbarDragOver);
  toolbarElement.addEventListener("drop", handleToolbarDrop);

  // Create hamburger button
  hamburgerButton = document.createElement("button");
  hamburgerButton.id = "th-hamburger";
  hamburgerButton.className = "th-hamburger";
  hamburgerButton.type = "button";
  hamburgerButton.setAttribute("aria-expanded", "false");
  hamburgerButton.setAttribute("aria-label", "Open toolbar");

  const hamburgerIcon = document.createElement("span");
  hamburgerIcon.className = "th-hamburger-icon";
  hamburgerButton.appendChild(hamburgerIcon);

  // Hamburger click handler
  hamburgerButton.addEventListener("click", (ev) => {
    ev.stopPropagation();
    toggleToolbar();
  });

  // Close toolbar when clicking outside
  document.addEventListener("click", (ev) => {
    if (!toolbarHost) return;
    if (toolbarHost.contains(ev.target)) return;
    if (isToolbarOpen()) closeToolbar();
  });

  // Close toolbar on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isToolbarOpen()) closeToolbar();
  });

  toolbarElement.appendChild(hamburgerButton);
  toolbarRoot.appendChild(toolbarElement);
  document.body.appendChild(toolbarHost);

  requestAnimationFrame(() => {
    ensureMatrixBackground();
    resizeMatrixCanvas();
  });
}

/**
 * Check if any tool panel is currently visible.
 */
function isToolbarOpen() {
  return registeredTools.some((tool) => tool.panel.dataset.open === "true");
}

/**
 * Open the toolbar (show all tool panels).
 */
function openToolbar() {
  registeredTools.forEach((tool) => {
    tool.panel.dataset.open = "true";
  });
  hamburgerButton.classList.add("open");
  hamburgerButton.setAttribute("aria-expanded", "true");
  if (matrixCanvas) {
    requestAnimationFrame(resizeMatrixCanvas);
  }
}

/**
 * Close the toolbar (hide all tool panels).
 */
function closeToolbar() {
  registeredTools.forEach((tool) => {
    tool.panel.dataset.open = "false";
  });
  hamburgerButton.classList.remove("open");
  hamburgerButton.setAttribute("aria-expanded", "false");
  if (matrixCanvas) {
    requestAnimationFrame(resizeMatrixCanvas);
  }
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
function normalizeToolOptions(optionsOrId, maybeContent, maybeOnInit) {
  if (typeof optionsOrId === "string") {
    return {
      id: optionsOrId,
      content:
        typeof maybeContent === "function" ? maybeContent() : maybeContent,
      onInit: maybeOnInit,
    };
  }

  if (typeof optionsOrId === "object" && optionsOrId !== null) {
    const normalized = { ...optionsOrId };
    if (typeof normalized.content === "function") {
      normalized.content = normalized.content();
    }
    return normalized;
  }

  throw new Error("registerTool requires an id string or options object");
}

export function registerTool(optionsOrId, maybeContent, maybeOnInit) {
  const { id, content, onInit } = normalizeToolOptions(
    optionsOrId,
    maybeContent,
    maybeOnInit,
  );

  if (!id) {
    throw new Error("registerTool requires a unique id");
  }

  if (!content) {
    throw new Error("registerTool requires content to render");
  }

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
  const panel = document.createElement("article");
  panel.id = id;
  panel.className = "th-tool-panel";
  panel.dataset.open = "false";

  // Add content
  if (content instanceof HTMLElement) {
    panel.appendChild(content);
  } else if (typeof content === "string") {
    panel.innerHTML = content;
  } else {
    panel.textContent = String(content);
  }

  // Prevent clicks inside panel from closing toolbar
  panel.addEventListener("click", (ev) => {
    const target = ev.target;
    if (target instanceof HTMLElement) {
      const tag = target.tagName;
      if (
        tag === "BUTTON" ||
        tag === "INPUT" ||
        tag === "SELECT" ||
        tag === "TEXTAREA" ||
        target.closest(
          "button, input, select, textarea, a, [data-th-interactive]",
        )
      ) {
        return;
      }
    }
    ev.stopPropagation();
  });

  // Insert panel before the hamburger button (so panels appear to the left)
  const dragHandle = document.createElement("div");
  dragHandle.className = "th-tool-handle";
  dragHandle.setAttribute("role", "presentation");
  dragHandle.title = "Drag to reorder";
  panel.prepend(dragHandle);

  panel.setAttribute("draggable", "false");

  let allowDrag = false;

  const enableDrag = () => {
    allowDrag = true;
    panel.setAttribute("draggable", "true");
  };

  const disableDrag = () => {
    allowDrag = false;
    panel.setAttribute("draggable", "false");
  };

  dragHandle.addEventListener("pointerdown", enableDrag);
  dragHandle.addEventListener("pointerup", disableDrag);
  dragHandle.addEventListener("pointercancel", disableDrag);
  dragHandle.addEventListener("pointerleave", (ev) => {
    if (ev.buttons === 0) {
      disableDrag();
    }
  });

  panel.addEventListener("pointerdown", (ev) => {
    if (
      !(ev.target instanceof HTMLElement) ||
      !dragHandle.contains(ev.target)
    ) {
      disableDrag();
    }
  });

  panel.addEventListener("pointerup", disableDrag);
  panel.addEventListener("pointercancel", disableDrag);

  panel.addEventListener("dragstart", (ev) => {
    if (!allowDrag) {
      ev.preventDefault();
      return;
    }
    allowDrag = false;

    dragSourceId = id;
    activeDragPanel = panel;
    dropPlaceholder = createDragPlaceholder(panel);

    panel.classList.add("dragging");

    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData("text/plain", id);
      ev.dataTransfer.setDragImage(panel, panel.offsetWidth / 2, 18);
    }

    toolbarElement.insertBefore(dropPlaceholder, panel);
    requestAnimationFrame(() => {
      panel.style.display = "none";
    });
  });

  panel.addEventListener("dragend", () => {
    if (panel.style.display === "none") {
      panel.style.removeProperty("display");
    }
    panel.classList.remove("dragging");
    disableDrag();

    if (dropPlaceholder && dropPlaceholder.parentNode === toolbarElement) {
      toolbarElement.insertBefore(panel, dropPlaceholder);
      dropPlaceholder.remove();
      updateRegisteredOrder();
    }

    activeDragPanel = null;
    dropPlaceholder = null;
    dragSourceId = null;
  });

  panel.addEventListener("dragover", (ev) => {
    if (!dropPlaceholder || !activeDragPanel || panel === activeDragPanel)
      return;

    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }

    const rect = panel.getBoundingClientRect();
    const offset = ev.clientY - rect.top;
    const ratio = offset / rect.height;

    if (ratio <= 0.4) {
      if (panel.previousSibling !== dropPlaceholder) {
        toolbarElement.insertBefore(dropPlaceholder, panel);
      }
    } else {
      const nextSibling =
        panel.nextSibling === dropPlaceholder
          ? dropPlaceholder.nextSibling
          : panel.nextSibling;
      toolbarElement.insertBefore(
        dropPlaceholder,
        nextSibling || hamburgerButton,
      );
    }
  });

  toolbarElement.insertBefore(panel, hamburgerButton);

  // Register tool
  registeredTools.push({ id, panel });

  // Call initialization callback if provided
  if (typeof onInit === "function") {
    onInit(panel);
  }

  if (matrixCanvas) {
    requestAnimationFrame(resizeMatrixCanvas);
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
