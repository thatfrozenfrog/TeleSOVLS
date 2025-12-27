// Toolbar initialization and state management
import { toolbarStyles } from "../../style/toolbarStyles.js";
import { state } from "./state.js";
import {
  filterPanels,
  handlePanelContainerDragOver,
  handlePanelContainerDrop,
} from "./panels.js";

export function initializeToolbar() {
  if (state.toolbarInitialized) return;
  state.toolbarInitialized = true;

  state.toolbarHost = document.createElement("div");
  state.toolbarHost.id = "th-toolbar-host";
  state.toolbarHost.style.all = "initial";
  state.toolbarHost.style.position = "fixed";
  state.toolbarHost.style.bottom = "24px";
  state.toolbarHost.style.right = "32px";
  state.toolbarHost.style.zIndex = "2147483646";
  state.toolbarHost.style.pointerEvents = "none";

  state.toolbarRoot = state.toolbarHost.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = toolbarStyles;
  state.toolbarRoot.appendChild(style);

  state.toolbarElement = document.createElement("div");
  state.toolbarElement.id = "th-toolbar";
  state.toolbarElement.className = "th-toolbar";
  state.toolbarElement.setAttribute("role", "region");
  state.toolbarElement.setAttribute("aria-label", "TeleSOVLS tools");

  state.panelContainer = document.createElement("div");
  state.panelContainer.id = "th-panel-container";
  state.panelContainer.className = "th-panel-container";
  state.panelContainer.setAttribute("role", "group");
  state.panelContainer.addEventListener(
    "dragover",
    handlePanelContainerDragOver,
  );
  state.panelContainer.addEventListener("drop", handlePanelContainerDrop);

  state.moduleWindow = document.createElement("div");
  state.moduleWindow.className = "th-window";
  state.moduleWindow.setAttribute("role", "dialog");
  state.moduleWindow.setAttribute("aria-label", "TeleSOVLS modules");

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "th-search";
  searchWrapper.setAttribute("role", "search");

  const searchLabel = document.createElement("span");
  searchLabel.className = "th-search-label";
  searchLabel.textContent = "Search";
  searchWrapper.appendChild(searchLabel);

  state.searchInput = document.createElement("input");
  state.searchInput.type = "search";
  state.searchInput.className = "th-search-input";
  state.searchInput.placeholder = "Search modules…";
  state.searchInput.autocomplete = "off";
  state.searchInput.spellcheck = false;
  state.searchInput.setAttribute("aria-label", "Search modules");
  state.searchInput.addEventListener("input", (event) => {
    filterPanels(event.target.value || "");
  });
  searchWrapper.appendChild(state.searchInput);

  state.moduleWindow.appendChild(searchWrapper);
  state.moduleWindow.appendChild(state.panelContainer);

  state.hamburgerButton = document.createElement("button");
  state.hamburgerButton.id = "th-toggle";
  state.hamburgerButton.className = "th-toggle";
  state.hamburgerButton.type = "button";
  state.hamburgerButton.textContent = "W";
  state.hamburgerButton.setAttribute("aria-expanded", "false");
  state.hamburgerButton.setAttribute("aria-controls", state.panelContainer.id);
  state.hamburgerButton.setAttribute("aria-label", "Toggle toolbar");

  state.hamburgerButton.addEventListener("click", (ev) => {
    ev.stopPropagation();
    toggleToolbar();
  });

  document.addEventListener("click", (ev) => {
    if (!state.toolbarHost) return;
    if (state.toolbarHost.contains(ev.target)) return;
    if (isToolbarOpen()) {
      closeToolbar();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isToolbarOpen()) {
      closeToolbar();
      if (state.hamburgerButton) {
        state.hamburgerButton.focus();
      }
    }
  });

  state.toolbarElement.appendChild(state.moduleWindow);
  state.toolbarElement.appendChild(state.hamburgerButton);

  state.toolbarRoot.appendChild(state.toolbarElement);
  document.body.appendChild(state.toolbarHost);
}

export function isToolbarOpen() {
  return Boolean(
    state.toolbarElement && state.toolbarElement.classList.contains("th-open"),
  );
}

export function openToolbar() {
  if (!state.toolbarElement || !state.panelContainer) return;
  state.toolbarElement.classList.add("th-open");
  if (state.hamburgerButton) {
    state.hamburgerButton.classList.add("open");
    state.hamburgerButton.setAttribute("aria-expanded", "true");
  }
  state.registeredTools.forEach((tool) => {
    tool.panel.dataset.open = "true";
  });
  filterPanels(state.currentSearchTerm);
  if (state.searchInput) {
    state.searchInput.focus({ preventScroll: true });
    state.searchInput.select();
  }
}

export function closeToolbar() {
  if (!state.toolbarElement || !state.panelContainer) return;
  state.toolbarElement.classList.remove("th-open");
  if (state.hamburgerButton) {
    state.hamburgerButton.classList.remove("open");
    state.hamburgerButton.setAttribute("aria-expanded", "false");
  }
  state.registeredTools.forEach((tool) => {
    tool.panel.dataset.open = "false";
  });
  filterPanels(state.currentSearchTerm);
}

export function toggleToolbar() {
  if (isToolbarOpen()) {
    closeToolbar();
  } else if (state.registeredTools.length > 0) {
    openToolbar();
  }
}
