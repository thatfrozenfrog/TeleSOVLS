// Wurst-inspired toolbar experience
let toolbarInitialized = false;
let toolbarHost = null;
let toolbarRoot = null;
let toolbarElement = null;
let panelContainer = null;
let hamburgerButton = null;
const registeredTools = [];
let activeDragPanel = null;
let dropPlaceholder = null;
let dragSourceId = null;
let moduleWindow = null;
let searchInput = null;
let currentSearchTerm = "";

function toTitleCase(value) {
  if (typeof value !== "string" || !value.trim()) {
    return "Module";
  }
  let sanitized = value.trim();
  sanitized = sanitized.replace(/^th(?=[-_]|$)/i, "");
  sanitized = sanitized.replace(/^[-_\s]+/, "");
  if (!sanitized) {
    return "Module";
  }
  return sanitized
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createDragPlaceholder(fromPanel) {
  const placeholderEl = document.createElement("article");
  placeholderEl.className = "th-tool-panel drag-placeholder";
  placeholderEl.style.height = `${fromPanel.offsetHeight}px`;
  placeholderEl.style.width = `${fromPanel.offsetWidth}px`;
  placeholderEl.dataset.open = "true";
  placeholderEl.dataset.title = fromPanel.dataset.title || "";
  return placeholderEl;
}

function updateRegisteredOrder() {
  if (!panelContainer) return;
  const toolsById = new Map(registeredTools.map((tool) => [tool.id, tool]));
  const orderedPanels = Array.from(
    panelContainer.querySelectorAll(".th-tool-panel:not(.drag-placeholder)"),
  );
  const newOrder = orderedPanels
    .map((panelEl) => toolsById.get(panelEl.id))
    .filter(Boolean);
  registeredTools.length = 0;
  registeredTools.push(...newOrder);
}

function filterPanels(searchTerm) {
  currentSearchTerm = searchTerm.trim().toLowerCase();

  const hasQuery = currentSearchTerm.length > 0;
  let visibleCount = 0;

  registeredTools.forEach(({ panel }) => {
    const title = (panel.dataset.title || "").toLowerCase();
    const contentText = (panel.textContent || "").toLowerCase();
    const matches =
      !hasQuery ||
      title.includes(currentSearchTerm) ||
      contentText.includes(currentSearchTerm);

    panel.classList.toggle("th-hidden", !matches);
    panel.dataset.open = matches && isToolbarOpen() ? "true" : "false";

    if (matches) {
      visibleCount += 1;
    }
  });

  if (moduleWindow) {
    moduleWindow.classList.toggle("th-empty", visibleCount === 0);
  }
}

function handlePanelContainerDragOver(ev) {
  if (!dropPlaceholder || !panelContainer) return;

  ev.preventDefault();
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  const target =
    ev.target instanceof HTMLElement
      ? ev.target.closest(".th-tool-panel")
      : null;

  if (!target || target === dropPlaceholder) {
    if (panelContainer.lastElementChild !== dropPlaceholder) {
      panelContainer.appendChild(dropPlaceholder);
    }
    return;
  }

  if (target === activeDragPanel) {
    return;
  }

  const rect = target.getBoundingClientRect();
  const offset = ev.clientY - rect.top;
  const insertBefore = offset <= rect.height / 2;

  if (insertBefore) {
    if (target.previousSibling !== dropPlaceholder) {
      panelContainer.insertBefore(dropPlaceholder, target);
    }
  } else {
    const nextSibling = target.nextSibling;
    if (nextSibling !== dropPlaceholder) {
      panelContainer.insertBefore(dropPlaceholder, nextSibling);
    }
  }
}

function handlePanelContainerDrop(ev) {
  if (!dropPlaceholder || !activeDragPanel || !panelContainer) return;
  const sourceId = ev.dataTransfer?.getData("text/plain") || dragSourceId;
  if (!sourceId || sourceId !== activeDragPanel.id) return;

  ev.preventDefault();
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  panelContainer.insertBefore(activeDragPanel, dropPlaceholder);
  dropPlaceholder.remove();
  dropPlaceholder = null;

  activeDragPanel.style.removeProperty("display");
  activeDragPanel.classList.remove("dragging");

  updateRegisteredOrder();

  activeDragPanel = null;
  dragSourceId = null;
}

function initializeToolbar() {
  if (toolbarInitialized) return;
  toolbarInitialized = true;

  toolbarHost = document.createElement("div");
  toolbarHost.id = "th-toolbar-host";
  toolbarHost.style.all = "initial";
  toolbarHost.style.position = "fixed";
  toolbarHost.style.bottom = "24px";
  toolbarHost.style.right = "32px";
  toolbarHost.style.zIndex = "2147483646";
  toolbarHost.style.pointerEvents = "none";

  toolbarRoot = toolbarHost.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    .th-switch {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 48px;
      height: 26px;
      flex-shrink: 0;
    }

    .th-switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }

    .th-switch-slider {
      position: absolute;
      inset: 0;
      cursor: pointer;
      background: rgba(32, 32, 32, 0.85);
      border: 1px solid rgba(245, 159, 0, 0.45);
      border-radius: 999px;
      transition: background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }

    .th-switch-slider::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 4px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: rgba(255, 240, 210, 0.85);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      transform: translate(0, -50%);
      transition: transform 160ms ease, background 160ms ease;
    }

    .th-switch input:checked + .th-switch-slider {
      background: rgba(245, 159, 0, 0.6);
      border-color: rgba(245, 159, 0, 0.75);
      box-shadow: 0 0 0 1px rgba(245, 159, 0, 0.35);
    }

    .th-switch input:checked + .th-switch-slider::before {
      transform: translate(22px, -50%);
      background: rgba(255, 240, 210, 1);
    }

    .th-switch input:focus-visible + .th-switch-slider {
      outline: 2px solid rgba(245, 159, 0, 0.75);
      outline-offset: 2px;
    }
    :host {
      color-scheme: dark;
      font-family: "Inter", "Segoe UI", system-ui, sans-serif;
      font-size: 14px;
      line-height: 1.45;
    }

    :host, :host * {
      box-sizing: border-box;
    }

    #th-toolbar {
      pointer-events: auto;
    }

    .th-toolbar {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    .th-window {
      display: none;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      background: rgba(20, 20, 20, 0.96);
      border: 1px solid rgba(245, 159, 0, 0.45);
      border-radius: 14px;
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45);
      min-width: 240px;
      max-width: min(420px, 75vw);
      max-height: clamp(260px, 60vh, 520px);
      overflow: hidden;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 160ms ease, transform 160ms ease;
      pointer-events: none;
    }

    .th-toolbar.th-open .th-window {
      display: flex;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .th-search {
      display: flex;
      align-items: center;
      gap: 8px;
      position: sticky;
      top: 0;
      background: rgba(20, 20, 20, 0.96);
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(245, 159, 0, 0.2);
      z-index: 1;
    }

    .th-search-label {
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 230, 190, 0.9);
      white-space: nowrap;
    }

    .th-search-input {
      flex: 1;
      min-width: 0;
      font: inherit;
      color: #fce7ba;
      background: rgba(32, 32, 32, 0.92);
      border: 1px solid rgba(245, 159, 0, 0.35);
      border-radius: 8px;
      padding: 6px 10px;
      transition: border-color 140ms ease, box-shadow 140ms ease;
    }

    .th-search-input:focus-visible {
      outline: none;
      border-color: rgba(245, 159, 0, 0.8);
      box-shadow: 0 0 0 2px rgba(245, 159, 0, 0.25);
    }

    .th-panel-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1 1 auto;
      overflow-y: auto;
      padding-top: 6px;
      padding-right: 2px;
    }

    .th-panel-container::-webkit-scrollbar {
      width: 6px;
    }

    .th-panel-container::-webkit-scrollbar-thumb {
      background: rgba(245, 159, 0, 0.35);
      border-radius: 999px;
    }

    .th-tool-panel {
      display: grid;
      gap: 10px;
      padding: 12px 14px 16px;
      border-radius: 10px;
      background: rgba(26, 26, 26, 0.95);
      border: 1px solid rgba(245, 159, 0, 0.3);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
      position: relative;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 160ms ease, transform 160ms ease;
    }

    .th-tool-panel::before {
      content: attr(data-title);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: rgba(245, 159, 0, 0.85);
      text-transform: uppercase;
    }

    .th-tool-panel[data-open="true"] {
      opacity: 1;
      transform: translateY(0);
    }

    .th-tool-panel.dragging {
      opacity: 0.6;
      transform: translateY(2px) scale(0.99);
    }

    .th-tool-panel.drag-placeholder {
      border: 1px dashed rgba(245, 159, 0, 0.6);
      background: repeating-linear-gradient(
        135deg,
        rgba(245, 159, 0, 0.1),
        rgba(245, 159, 0, 0.1) 12px,
        transparent 12px,
        transparent 24px
      );
      animation: th-placeholder-pulse 1100ms ease-in-out infinite;
    }

    .th-tool-panel.th-hidden {
      display: none;
    }

    .th-tool-handle {
      width: 100%;
      height: 12px;
      border-radius: 999px;
      background:
        linear-gradient(90deg, rgba(255, 255, 255, 0.16) 20%, transparent 20%) 0 0 / 14px 6px,
        rgba(255, 255, 255, 0.05);
      margin-bottom: 6px;
      cursor: grab;
      transition: opacity 160ms ease;
      opacity: 0.55;
    }

    .th-tool-handle:hover {
      opacity: 0.85;
    }

    .th-tool-handle:active {
      cursor: grabbing;
    }

    .th-tool-panel h1,
    .th-tool-panel h2,
    .th-tool-panel h3,
    .th-tool-panel h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #ffe7a4;
    }

    .th-tool-panel label {
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(255, 226, 173, 0.85);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .th-tool-panel button,
    .th-tool-panel input,
    .th-tool-panel select,
    .th-tool-panel textarea {
      font: inherit;
      color: #fce7ba;
      background: rgba(32, 32, 32, 0.9);
      border: 1px solid rgba(245, 159, 0, 0.4);
      border-radius: 8px;
      padding: 8px 10px;
      transition: border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
    }

    .th-tool-panel button:hover,
    .th-tool-panel input:hover,
    .th-tool-panel select:hover,
    .th-tool-panel textarea:hover {
      border-color: rgba(245, 159, 0, 0.75);
      box-shadow: 0 0 0 1px rgba(245, 159, 0, 0.3);
    }

    .th-tool-panel button:active {
      transform: translateY(1px);
    }

    .th-tool-panel small,
    .th-tool-panel p {
      margin: 0;
      font-size: 0.85rem;
      color: rgba(255, 240, 210, 0.78);
      line-height: 1.5;
    }

    .th-toggle {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      border: 1px solid rgba(245, 159, 0, 0.65);
      background: linear-gradient(180deg, rgba(36, 36, 36, 0.95), rgba(18, 18, 18, 0.95));
      color: #f4b63d;
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: 0 6px 0 rgba(0, 0, 0, 0.55);
      transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
      position: relative;
    }

    .th-toggle::after {
      content: "";
      position: absolute;
      inset: 4px 6px;
      border-radius: 8px;
      border: 1px solid rgba(245, 159, 0, 0.2);
      opacity: 0.7;
      pointer-events: none;
    }

    .th-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 9px 0 rgba(0, 0, 0, 0.55);
    }

    .th-toggle:active {
      transform: translateY(1px);
      box-shadow: 0 3px 0 rgba(0, 0, 0, 0.55);
    }

    .th-toggle:focus-visible {
      outline: 2px solid rgba(245, 159, 0, 0.75);
      outline-offset: 4px;
    }

    .th-toggle.open {
      background: linear-gradient(180deg, rgba(245, 159, 0, 0.25), rgba(45, 26, 0, 0.92));
      color: #ffe7a4;
      box-shadow: 0 3px 0 rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(245, 159, 0, 0.45);
    }

    .th-window.th-empty .th-panel-container::after {
      content: "No modules found";
      display: block;
      text-align: center;
      padding: 24px 8px;
      color: rgba(255, 240, 210, 0.65);
      font-size: 0.85rem;
      letter-spacing: 0.04em;
    }

    @keyframes th-placeholder-pulse {
      0%, 100% {
        opacity: 0.45;
      }
      50% {
        opacity: 0.75;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .th-window,
      .th-tool-panel {
        transition: none;
      }
    }
  `;
  toolbarRoot.appendChild(style);

  toolbarElement = document.createElement("div");
  toolbarElement.id = "th-toolbar";
  toolbarElement.className = "th-toolbar";
  toolbarElement.setAttribute("role", "region");
  toolbarElement.setAttribute("aria-label", "TeleSOVLS tools");

  panelContainer = document.createElement("div");
  panelContainer.id = "th-panel-container";
  panelContainer.className = "th-panel-container";
  panelContainer.setAttribute("role", "group");
  panelContainer.addEventListener("dragover", handlePanelContainerDragOver);
  panelContainer.addEventListener("drop", handlePanelContainerDrop);

  moduleWindow = document.createElement("div");
  moduleWindow.className = "th-window";
  moduleWindow.setAttribute("role", "dialog");
  moduleWindow.setAttribute("aria-label", "TeleSOVLS modules");

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "th-search";
  searchWrapper.setAttribute("role", "search");

  const searchLabel = document.createElement("span");
  searchLabel.className = "th-search-label";
  searchLabel.textContent = "Search";
  searchWrapper.appendChild(searchLabel);

  searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "th-search-input";
  searchInput.placeholder = "Search modules…";
  searchInput.autocomplete = "off";
  searchInput.spellcheck = false;
  searchInput.setAttribute("aria-label", "Search modules");
  searchInput.addEventListener("input", (event) => {
    filterPanels(event.target.value || "");
  });
  searchWrapper.appendChild(searchInput);

  moduleWindow.appendChild(searchWrapper);
  moduleWindow.appendChild(panelContainer);

  hamburgerButton = document.createElement("button");
  hamburgerButton.id = "th-toggle";
  hamburgerButton.className = "th-toggle";
  hamburgerButton.type = "button";
  hamburgerButton.textContent = "W";
  hamburgerButton.setAttribute("aria-expanded", "false");
  hamburgerButton.setAttribute("aria-controls", panelContainer.id);
  hamburgerButton.setAttribute("aria-label", "Toggle toolbar");

  hamburgerButton.addEventListener("click", (ev) => {
    ev.stopPropagation();
    toggleToolbar();
  });

  document.addEventListener("click", (ev) => {
    if (!toolbarHost) return;
    if (toolbarHost.contains(ev.target)) return;
    if (isToolbarOpen()) {
      closeToolbar();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isToolbarOpen()) {
      closeToolbar();
      if (hamburgerButton) {
        hamburgerButton.focus();
      }
    }
  });

  toolbarElement.appendChild(moduleWindow);
  toolbarElement.appendChild(hamburgerButton);

  toolbarRoot.appendChild(toolbarElement);
  document.body.appendChild(toolbarHost);
}

function isToolbarOpen() {
  return Boolean(
    toolbarElement && toolbarElement.classList.contains("th-open"),
  );
}

function openToolbar() {
  if (!toolbarElement || !panelContainer) return;
  toolbarElement.classList.add("th-open");
  if (hamburgerButton) {
    hamburgerButton.classList.add("open");
    hamburgerButton.setAttribute("aria-expanded", "true");
  }
  registeredTools.forEach((tool) => {
    tool.panel.dataset.open = "true";
  });
  filterPanels(currentSearchTerm);
  if (searchInput) {
    searchInput.focus({ preventScroll: true });
    searchInput.select();
  }
}

function closeToolbar() {
  if (!toolbarElement || !panelContainer) return;
  toolbarElement.classList.remove("th-open");
  if (hamburgerButton) {
    hamburgerButton.classList.remove("open");
    hamburgerButton.setAttribute("aria-expanded", "false");
  }
  registeredTools.forEach((tool) => {
    tool.panel.dataset.open = "false";
  });
  filterPanels(currentSearchTerm);
}

function toggleToolbar() {
  if (isToolbarOpen()) {
    closeToolbar();
  } else if (registeredTools.length > 0) {
    openToolbar();
  }
}

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

  if (!toolbarInitialized) {
    initializeToolbar();
  }

  const existing = registeredTools.find((tool) => tool.id === id);
  if (existing) {
    console.warn(`Tool with id "${id}" is already registered.`);
    return existing.panel;
  }

  const panel = document.createElement("article");
  panel.id = id;
  panel.className = "th-tool-panel";
  panel.dataset.open = isToolbarOpen() ? "true" : "false";
  panel.dataset.title = toTitleCase(id);

  const dragHandle = document.createElement("div");
  dragHandle.className = "th-tool-handle";
  dragHandle.setAttribute("role", "presentation");
  dragHandle.title = "Drag to reorder";
  panel.appendChild(dragHandle);

  if (content instanceof HTMLElement) {
    panel.appendChild(content);
  } else if (typeof content === "string") {
    panel.insertAdjacentHTML("beforeend", content);
  } else {
    panel.appendChild(document.createTextNode(String(content)));
  }

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

    panelContainer.insertBefore(dropPlaceholder, panel);
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

    if (dropPlaceholder && dropPlaceholder.parentNode === panelContainer) {
      panelContainer.insertBefore(panel, dropPlaceholder);
      dropPlaceholder.remove();
      updateRegisteredOrder();
    }

    activeDragPanel = null;
    dropPlaceholder = null;
    dragSourceId = null;
  });

  panelContainer.appendChild(panel);

  registeredTools.push({ id, panel });

  if (typeof onInit === "function") {
    onInit(panel);
  }

  filterPanels(currentSearchTerm);

  return panel;
}

export function createUI() {
  if (!toolbarInitialized) {
    initializeToolbar();
  }
}
