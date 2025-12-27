// Panel management, dragging, and filtering logic
import { state } from "./state.js";
import { isToolbarOpen } from "./toolbar.js";

export function createDragPlaceholder(fromPanel) {
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

export function updateRegisteredOrder() {
  if (!state.panelContainer) return;
  const toolsById = new Map(
    state.registeredTools.map((tool) => [tool.id, tool]),
  );
  const orderedPanels = Array.from(
    state.panelContainer.querySelectorAll(
      ".th-tool-panel:not(.drag-placeholder)",
    ),
  );
  const newOrder = orderedPanels
    .map((panelEl) => toolsById.get(panelEl.id))
    .filter(Boolean);
  state.registeredTools.length = 0;
  state.registeredTools.push(...newOrder);
}

export function filterPanels(searchTerm) {
  state.currentSearchTerm = searchTerm.trim().toLowerCase();

  const hasQuery = state.currentSearchTerm.length > 0;
  let visibleCount = 0;

  state.registeredTools.forEach(({ panel }) => {
    const title = (panel.dataset.title || "").toLowerCase();
    const contentText = (panel.textContent || "").toLowerCase();
    const matches =
      !hasQuery ||
      title.includes(state.currentSearchTerm) ||
      contentText.includes(state.currentSearchTerm);

    panel.classList.toggle("th-hidden", !matches);
    panel.dataset.open = matches && isToolbarOpen() ? "true" : "false";

    if (matches) {
      visibleCount += 1;
    }
  });

  if (state.moduleWindow) {
    state.moduleWindow.classList.toggle("th-empty", visibleCount === 0);
  }
}

export function handlePanelContainerDragOver(ev) {
  if (!state.dropPlaceholder || !state.panelContainer) return;

  ev.preventDefault();
  ev.stopPropagation();
  if (typeof ev.stopImmediatePropagation === "function") {
    ev.stopImmediatePropagation();
  }
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  const otherPanels = Array.from(
    state.panelContainer.querySelectorAll(
      ".th-tool-panel:not(.drag-placeholder)",
    ),
  ).filter((panel) => panel !== state.activeDragPanel);

  if (otherPanels.length === 0) {
    if (state.panelContainer.lastElementChild !== state.dropPlaceholder) {
      state.panelContainer.appendChild(state.dropPlaceholder);
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
    if (state.dropPlaceholder.nextSibling === insertBeforeNode) {
      return;
    }
    state.panelContainer.insertBefore(state.dropPlaceholder, insertBeforeNode);
  } else if (state.panelContainer.lastElementChild !== state.dropPlaceholder) {
    state.panelContainer.appendChild(state.dropPlaceholder);
  }
}

export function handlePanelContainerDrop(ev) {
  if (!state.dropPlaceholder || !state.activeDragPanel || !state.panelContainer)
    return;
  const sourceId = ev.dataTransfer?.getData("text/plain") || state.dragSourceId;
  if (!sourceId || sourceId !== state.activeDragPanel.id) return;

  ev.preventDefault();
  ev.stopPropagation();
  if (typeof ev.stopImmediatePropagation === "function") {
    ev.stopImmediatePropagation();
  }
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = "move";
  }

  state.panelContainer.insertBefore(
    state.activeDragPanel,
    state.dropPlaceholder,
  );
  state.dropPlaceholder.remove();
  state.dropPlaceholder = null;

  state.activeDragPanel.style.removeProperty("display");
  state.activeDragPanel.classList.remove("dragging");

  if (!state.panelContainer.contains(state.activeDragPanel)) {
    state.panelContainer.appendChild(state.activeDragPanel);
  }

  updateRegisteredOrder();

  state.activeDragPanel = null;
  state.dragSourceId = null;
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

  const { initializeToolbar } = require("./toolbar.js");
  if (!state.toolbarInitialized) {
    initializeToolbar();
  }

  const existing = state.registeredTools.find((tool) => tool.id === id);
  if (existing) {
    console.warn(`Tool with id "${id}" is already registered.`);
    return existing.panel;
  }

  const { toTitleCase } = require("./utils.js");

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

    state.dragSourceId = id;
    state.activeDragPanel = panel;
    state.dropPlaceholder = createDragPlaceholder(panel);

    panel.classList.add("dragging");

    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData("text/plain", id);
      ev.dataTransfer.setDragImage(panel, panel.offsetWidth / 2, 18);
    }

    if (panel.nextSibling) {
      state.panelContainer.insertBefore(
        state.dropPlaceholder,
        panel.nextSibling,
      );
    } else {
      state.panelContainer.appendChild(state.dropPlaceholder);
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

    if (
      state.dropPlaceholder &&
      state.dropPlaceholder.parentNode === state.panelContainer
    ) {
      state.panelContainer.insertBefore(panel, state.dropPlaceholder);
      state.dropPlaceholder.remove();
      updateRegisteredOrder();
    }

    state.activeDragPanel = null;
    state.dropPlaceholder = null;
    state.dragSourceId = null;
  });

  state.panelContainer.appendChild(panel);

  state.registeredTools.push({ id, panel });

  if (typeof onInit === "function") {
    onInit(panel);
  }

  filterPanels(state.currentSearchTerm);

  return panel;
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
