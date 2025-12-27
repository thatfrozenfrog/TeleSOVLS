// Toggle tool registration
import { registerTool } from "./panels.js";
import { toTitleCase, createToolContentWrapper } from "./utils.js";

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
