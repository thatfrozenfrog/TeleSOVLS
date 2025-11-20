import { toolbarStyles } from "../style/toolbarStyles.js";

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
  const placeholderEl = fromPanel.cloneNode(true);
  placeholderEl.classList.add("drag-placeholder");
  placeholderEl.classList.remove("dragging");
  placeholderEl.dataset.open = "true";
  placeholderEl.dataset.title = fromPanel.dataset.title || "";
  placeholderEl.setAttribute("aria-hidden", "true");

  placeholderEl.querySelectorAll("[id]").forEach((node) => {
    node.removeAttribute("id");
  });

  placeholderEl.style.height = `${fromPanel.offsetHeight}px`;
  placeholderEl.style.width = `${fromPanel.offsetWidth}px`;
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
  ev.stopPropagation();
  if (typeof ev.stopImmediatePropagation === "function") {
    ev.stopImmediatePropagation();
  }
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  const otherPanels = Array.from(
    panelContainer.querySelectorAll(".th-tool-panel:not(.drag-placeholder)"),
  ).filter((panel) => panel !== activeDragPanel);

  if (otherPanels.length === 0) {
    if (panelContainer.lastElementChild !== dropPlaceholder) {
      panelContainer.appendChild(dropPlaceholder);
    }
    return;
  }

  let insertBeforeNode = null;
  for (const panel of otherPanels) {
    const rect = panel.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    if (ev.clientY < midpoint) {
      insertBeforeNode = panel;
      break;
    }
  }

  if (insertBeforeNode) {
    if (dropPlaceholder.nextSibling === insertBeforeNode) {
      return;
    }
    panelContainer.insertBefore(dropPlaceholder, insertBeforeNode);
  } else if (panelContainer.lastElementChild !== dropPlaceholder) {
    panelContainer.appendChild(dropPlaceholder);
  }
}

function handlePanelContainerDrop(ev) {
  if (!dropPlaceholder || !activeDragPanel || !panelContainer) return;
  const sourceId = ev.dataTransfer?.getData("text/plain") || dragSourceId;
  if (!sourceId || sourceId !== activeDragPanel.id) return;

  ev.preventDefault();
  ev.stopPropagation();
  if (typeof ev.stopImmediatePropagation === "function") {
    ev.stopImmediatePropagation();
  }
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  panelContainer.insertBefore(activeDragPanel, dropPlaceholder);
  dropPlaceholder.remove();
  dropPlaceholder = null;

  activeDragPanel.style.removeProperty("display");
  activeDragPanel.classList.remove("dragging");

  if (!panelContainer.contains(activeDragPanel)) {
    panelContainer.appendChild(activeDragPanel);
  }

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
  style.textContent = toolbarStyles;
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

    if (panel.nextSibling) {
      panelContainer.insertBefore(dropPlaceholder, panel.nextSibling);
    } else {
      panelContainer.appendChild(dropPlaceholder);
    }
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

function createToolContentWrapper() {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  return container;
}

export function createInputControl(options = {}) {
  const {
    id,
    label,
    type = "text",
    min,
    max,
    step,
    value = "",
    placeholder,
    onChange,
    persist = false,
  } = options;

  const wrapper = document.createElement("label");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.fontSize = "12px";
  if (label) {
    wrapper.textContent = label;
  }

  const input = document.createElement("input");
  input.type = type;
  if (id) input.id = id;
  if (min !== undefined) input.min = String(min);
  if (max !== undefined) input.max = String(max);
  if (step !== undefined) input.step = String(step);
  if (placeholder) input.placeholder = placeholder;

  const storageKey = persist && id ? `th-input-${id}` : null;
  let initialValue = value;

  if (storageKey) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        initialValue = stored;
      }
    } catch (e) {
      console.warn(`[createInputControl] failed to load ${storageKey}`, e);
    }
  }

  input.value = initialValue != null ? String(initialValue) : "";

  wrapper.appendChild(input);

  const context = {
    wrapper,
    input,
    setValue(nextValue) {
      input.value = nextValue != null ? String(nextValue) : "";
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(nextValue));
        } catch (e) {
          console.warn(`[createInputControl] failed to save ${storageKey}`, e);
        }
      }
    },
  };

  if (typeof onChange === "function") {
    input.addEventListener("change", () => {
      const result = onChange(input.value, context);
      const finalValue = result !== undefined ? result : input.value;
      context.setValue(finalValue);
    });
  } else if (storageKey) {
    input.addEventListener("change", () => {
      try {
        localStorage.setItem(storageKey, input.value);
      } catch (e) {
        console.warn(`[createInputControl] failed to save ${storageKey}`, e);
      }
    });
  }

  return context;
}

export function createCheckboxControl(options = {}) {
  const {
    id,
    label,
    initialChecked = false,
    onChange,
    persist = false,
  } = options;

  const wrapper = document.createElement("label");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "8px";
  wrapper.style.fontSize = "12px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if (id) checkbox.id = id;

  const storageKey = persist && id ? `th-checkbox-${id}` : null;
  let checkedState = initialChecked;

  if (storageKey) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        checkedState = stored === "true";
      }
    } catch (e) {
      console.warn(`[createCheckboxControl] failed to load ${storageKey}`, e);
    }
  }

  checkbox.checked = Boolean(checkedState);

  const labelText = document.createElement("span");
  if (label) {
    labelText.textContent = label;
  }

  wrapper.appendChild(checkbox);
  wrapper.appendChild(labelText);

  const context = {
    wrapper,
    checkbox,
    setChecked(value) {
      const next = Boolean(value);
      if (checkbox.checked !== next) {
        checkbox.checked = next;
      }
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(next));
        } catch (e) {
          console.warn(
            `[createCheckboxControl] failed to save ${storageKey}`,
            e,
          );
        }
      }
    },
  };

  if (typeof onChange === "function") {
    checkbox.addEventListener("change", () => {
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(checkbox.checked));
        } catch (e) {
          console.warn(
            `[createCheckboxControl] failed to save ${storageKey}`,
            e,
          );
        }
      }
      onChange(checkbox.checked, context);
    });
  } else if (storageKey) {
    checkbox.addEventListener("change", () => {
      try {
        localStorage.setItem(storageKey, String(checkbox.checked));
      } catch (e) {
        console.warn(`[createCheckboxControl] failed to save ${storageKey}`, e);
      }
    });
  }

  return context;
}

export function createToggleControl(options = {}) {
  const {
    id,
    label,
    initialChecked = false,
    onChange,
    persist = false,
  } = options;

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "4px";

  if (label) {
    const labelEl = document.createElement("label");
    labelEl.textContent = label;
    labelEl.style.fontSize = "12px";
    if (id) labelEl.htmlFor = id;
    wrapper.appendChild(labelEl);
  }

  const toggleWrapper = document.createElement("label");
  toggleWrapper.className = "th-switch";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if (id) checkbox.id = id;

  const storageKey = persist && id ? `th-toggle-${id}` : null;
  let checkedState = initialChecked;

  if (storageKey) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        checkedState = stored === "true";
      }
    } catch (e) {
      console.warn(`[createToggleControl] failed to load ${storageKey}`, e);
    }
  }

  checkbox.checked = Boolean(checkedState);
  toggleWrapper.appendChild(checkbox);

  const slider = document.createElement("span");
  slider.className = "th-switch-slider";
  toggleWrapper.appendChild(slider);

  wrapper.appendChild(toggleWrapper);

  const context = {
    wrapper,
    checkbox,
    setChecked(value) {
      const next = Boolean(value);
      if (checkbox.checked !== next) {
        checkbox.checked = next;
      }
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(next));
        } catch (e) {
          console.warn(`[createToggleControl] failed to save ${storageKey}`, e);
        }
      }
    },
  };

  if (typeof onChange === "function") {
    checkbox.addEventListener("change", () => {
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(checkbox.checked));
        } catch (e) {
          console.warn(`[createToggleControl] failed to save ${storageKey}`, e);
        }
      }
      onChange(checkbox.checked, context);
    });
  } else if (storageKey) {
    checkbox.addEventListener("change", () => {
      try {
        localStorage.setItem(storageKey, String(checkbox.checked));
      } catch (e) {
        console.warn(`[createToggleControl] failed to save ${storageKey}`, e);
      }
    });
  }

  return context;
}

export function registerToggleTool(options = {}) {
  const {
    id,
    title,
    toggleId = id ? `${id}-toggle` : undefined,
    initialChecked = false,
    onToggleChange,
    description,
    onReady,
    persist = false,
  } = options;

  if (!id) {
    throw new Error("registerToggleTool requires an id");
  }

  const resolvedTitle =
    typeof title === "string" && title.trim().length > 0
      ? title
      : toTitleCase(id);

  const resolvedToggleId =
    typeof toggleId === "string" && toggleId.trim().length > 0
      ? toggleId
      : `${id}-toggle`;

  const content = createToolContentWrapper();

  if (resolvedTitle) {
    const heading = document.createElement("label");
    heading.textContent = resolvedTitle;
    heading.htmlFor = resolvedToggleId;
    content.appendChild(heading);
  }

  const toggleWrapper = document.createElement("label");
  toggleWrapper.className = "th-switch";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = resolvedToggleId;

  const storageKey = persist ? `th-toggle-${id}` : null;
  let checkedState = initialChecked;

  if (storageKey) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        checkedState = stored === "true";
      }
    } catch (e) {
      console.warn(`[registerToggleTool] failed to load ${storageKey}`, e);
    }
  }

  checkbox.checked = Boolean(checkedState);
  toggleWrapper.appendChild(checkbox);

  const slider = document.createElement("span");
  slider.className = "th-switch-slider";
  toggleWrapper.appendChild(slider);

  content.appendChild(toggleWrapper);

  if (description) {
    const desc = document.createElement("p");
    desc.textContent = description;
    content.appendChild(desc);
  }

  const context = {
    id,
    content,
    checkbox,
    setChecked(value) {
      const next = Boolean(value);
      if (checkbox.checked !== next) {
        checkbox.checked = next;
      }
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, String(next));
        } catch (e) {
          console.warn(`[registerToggleTool] failed to save ${storageKey}`, e);
        }
      }
    },
  };

  if (typeof onToggleChange === "function") {
    checkbox.addEventListener("change", () => {
      try {
        if (storageKey) {
          localStorage.setItem(storageKey, String(checkbox.checked));
        }
        onToggleChange(checkbox.checked, context);
      } catch (error) {
        console.error(`[th-toolbar] toggle handler for "${id}" failed`, error);
      }
    });
  } else if (storageKey) {
    checkbox.addEventListener("change", () => {
      try {
        localStorage.setItem(storageKey, String(checkbox.checked));
      } catch (e) {
        console.warn(`[registerToggleTool] failed to save ${storageKey}`, e);
      }
    });
  }

  const panel = registerTool({
    id,
    content,
    onInit: (panelEl) => {
      context.panel = panelEl;
      if (typeof onReady === "function") {
        try {
          onReady({ ...context, panel: panelEl });
        } catch (error) {
          console.error(
            `[th-toolbar] onReady handler for "${id}" failed`,
            error,
          );
        }
      }
    },
  });

  context.panel = panel;

  return {
    panel,
    checkbox,
    content,
    setChecked: context.setChecked,
  };
}

export function createUI() {
  if (!toolbarInitialized) {
    initializeToolbar();
  }
}
