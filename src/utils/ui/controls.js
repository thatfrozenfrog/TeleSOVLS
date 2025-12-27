// Input, checkbox, and toggle control creation

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
