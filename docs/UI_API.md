# TeleSOVLS UI API

> **Wurst-inspired toolbar system for organizing interactive modules**

The UI module (`src/utils/ui.js`) provides a draggable, searchable toolbar for registering tools and controls in a floating panel interface. It supports toggle switches, custom inputs, and fully accessible drag-and-drop reordering.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [API Reference](#api-reference)
   - [`createUI()`](#createui)
   - [`registerTool(options)`](#registertooloptions)
   - [`registerToggleTool(options)`](#registertoggletooloptions)
   - [`createInputControl(options)`](#createinputcontroloptions)
3. [Examples](#examples)
4. [Keyboard & Accessibility](#keyboard--accessibility)
5. [Styling & Theming](#styling--theming)

---

## Quick Start

```javascript
import { createUI, registerToggleTool, createInputControl } from "./utils/ui.js";

// Initialize the toolbar (call once)
createUI();

// Register a simple toggle module
registerToggleTool({
  id: "auto-typing",
  title: "Auto Typing",
  description: "Automatically types commands at a set speed",
  initialChecked: false,
  onToggleChange: (checked) => {
    console.log("Auto typing is now", checked ? "enabled" : "disabled");
  }
});
```

The toolbar appears in the bottom-right corner with a **"W"** button. Click to open the module window, search for your tools, and drag panels to reorder them.

---

## API Reference

### `createUI()`

Initializes the toolbar DOM structure and injects it into the page. Safe to call multiple times (only initializes once).

**Returns:** `void`

```javascript
import { createUI } from "./utils/ui.js";

createUI();
```

---

### `registerTool(options)`

Registers a custom tool panel with arbitrary content.

**Parameters:**

- **`id`** (string, required): Unique identifier for the panel
- **`content`** (HTMLElement | string | function, required): Panel content. If a function, it will be invoked to get the content.
- **`onInit`** (function, optional): Callback invoked after the panel is created, receives `(panelElement)` as argument

**Returns:** `HTMLElement` – The created panel element

**Example:**

```javascript
import { registerTool } from "./utils/ui.js";

const customContent = document.createElement("div");
customContent.innerHTML = `
  <h3>Custom Module</h3>
  <button id="my-action">Click Me</button>
`;

const panel = registerTool({
  id: "custom-module",
  content: customContent,
  onInit: (panelEl) => {
    const btn = panelEl.querySelector("#my-action");
    btn.addEventListener("click", () => alert("Action triggered!"));
  }
});
```

**Shorthand signature (legacy):**

```javascript
registerTool("tool-id", contentHTML, onInitCallback);
```

---

### `registerToggleTool(options)`

Registers a toggle switch panel with title, description, and change handler.

**Parameters:**

- **`id`** (string, required): Unique identifier
- **`title`** (string, optional): Display title (auto-generated from `id` if omitted)
- **`toggleId`** (string, optional): DOM ID for the checkbox (defaults to `${id}-toggle`)
- **`initialChecked`** (boolean, optional): Default checked state (default: `false`)
- **`description`** (string, optional): Helper text displayed below the toggle
- **`onToggleChange`** (function, optional): Callback invoked on state change, receives `(isChecked, context)`
- **`onReady`** (function, optional): Callback invoked when panel is mounted, receives `{ id, panel, checkbox, content, setChecked }`

**Returns:** `{ panel, checkbox, content, setChecked }`

**Example:**

```javascript
import { registerToggleTool } from "./utils/ui.js";

const toggle = registerToggleTool({
  id: "debug-mode",
  title: "Debug Mode",
  description: "Show console logs for all operations",
  initialChecked: false,
  onToggleChange: (checked, ctx) => {
    window.DEBUG_ENABLED = checked;
    console.log("Debug mode:", checked);
  },
  onReady: ({ panel, checkbox }) => {
    console.log("Toggle panel ready:", panel.id);
  }
});

// Programmatically change state
toggle.setChecked(true);
```

---

### `createInputControl(options)`

Creates a labeled input field (text, number, range, etc.) with optional validation and change handling.

**Parameters:**

- **`id`** (string, optional): Input element ID
- **`label`** (string, optional): Label text displayed above input
- **`type`** (string, optional): Input type (default: `"text"`)
- **`min`** (number, optional): Minimum value for number/range inputs
- **`max`** (number, optional): Maximum value for number/range inputs
- **`step`** (number, optional): Step increment for number/range inputs
- **`value`** (any, optional): Initial value
- **`placeholder`** (string, optional): Placeholder text
- **`onChange`** (function, optional): Callback invoked on change, receives `(value, context)`. Return a value to update the input.

**Returns:** `{ wrapper, input, setValue }`

**Example:**

```javascript
import { registerTool, createInputControl } from "./utils/ui.js";

const speedInput = createInputControl({
  id: "typing-speed",
  label: "Typing Speed (ms)",
  type: "number",
  min: 50,
  max: 500,
  step: 10,
  value: 150,
  onChange: (val) => {
    console.log("New speed:", val);
    return Math.max(50, Math.min(500, parseInt(val, 10) || 150));
  }
});

registerTool({
  id: "typing-controls",
  content: speedInput.wrapper
});

// Programmatically update
speedInput.setValue(200);
```

---

## Examples

### Complete Module with Toggle and Input

```javascript
import { createUI, registerTool, registerToggleTool, createInputControl } from "./utils/ui.js";

createUI();

// 1. Toggle switch
const autoToggle = registerToggleTool({
  id: "auto-hack",
  title: "Auto Hack",
  description: "Automatically attempts port hacking",
  initialChecked: false,
  onToggleChange: (checked) => {
    if (checked) {
      startAutoHack();
    } else {
      stopAutoHack();
    }
  }
});

// 2. Configuration inputs
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.gap = "8px";

const delayInput = createInputControl({
  label: "Delay (ms)",
  type: "number",
  min: 100,
  max: 5000,
  step: 100,
  value: 1000,
  onChange: (val) => {
    window.AUTO_HACK_DELAY = parseInt(val, 10) || 1000;
  }
});

const retriesInput = createInputControl({
  label: "Max Retries",
  type: "number",
  min: 1,
  max: 20,
  value: 5,
  onChange: (val) => {
    window.AUTO_HACK_RETRIES = parseInt(val, 10) || 5;
  }
});

container.appendChild(delayInput.wrapper);
container.appendChild(retriesInput.wrapper);

registerTool({
  id: "auto-hack-settings",
  content: container
});
```

### HTML String Content

```javascript
registerTool({
  id: "status-display",
  content: `
    <div style="padding: 8px;">
      <h4>System Status</h4>
      <p id="status-text">Idle</p>
    </div>
  `,
  onInit: (panel) => {
    const status = panel.querySelector("#status-text");
    setInterval(() => {
      status.textContent = new Date().toLocaleTimeString();
    }, 1000);
  }
});
```

---

## Keyboard & Accessibility

- **Escape**: Close the toolbar when open
- **Click outside**: Close the toolbar
- **Search**: Focus search input when toolbar opens
- **Drag handle**: Each panel has a drag handle for reordering (accessible via pointer events)
- **ARIA attributes**: Panels use `role="region"`, `aria-label`, and `aria-expanded` for screen readers

---

## Styling & Theming

The toolbar uses Shadow DOM to isolate styles. All CSS is defined in `src/style/toolbarStyles.js` and injected into the shadow root.

### CSS Classes

- `.th-toolbar`: Main toolbar container
- `.th-tool-panel`: Individual module panel
- `.th-tool-handle`: Drag handle at the top of each panel
- `.th-switch`: Toggle switch wrapper
- `.th-switch-slider`: Toggle slider visual
- `.th-window`: Module window container
- `.th-search`: Search input wrapper
- `.th-toggle`: Hamburger button ("W" icon)
- `.drag-placeholder`: Placeholder shown during drag
- `.th-hidden`: Applied to filtered-out panels

### Customization

To modify styles, edit `src/style/toolbarStyles.js`. The toolbar uses CSS custom properties for theming:

```css
:host {
  --th-bg: #1e1e1e;
  --th-fg: #ffffff;
  --th-accent: #007acc;
  --th-border: #333;
}
```

---

## Advanced Usage

### Programmatic Control

```javascript
// Access toolbar state
import { createUI } from "./utils/ui.js";

createUI();

// Toolbar is always visible, toggle via "W" button or click outside to close
```

### Dynamic Content Updates

```javascript
const panel = registerTool({
  id: "live-stats",
  content: "<div id='stats'></div>",
  onInit: (panelEl) => {
    const stats = panelEl.querySelector("#stats");
    setInterval(() => {
      stats.innerHTML = `
        <p>CPU: ${Math.random() * 100 | 0}%</p>
        <p>Memory: ${Math.random() * 100 | 0}%</p>
      `;
    }, 2000);
  }
});
```

### Multi-Choice Controls

For radio button groups or select dropdowns, build custom HTML and register with `registerTool`:

```javascript
const choiceHTML = `
  <fieldset class="th-inline-radio">
    <legend>Version</legend>
    <label><input type="radio" name="version" value="v1" checked> v1</label>
    <label><input type="radio" name="version" value="v2"> v2</label>
  </fieldset>
`;

registerTool({
  id: "version-selector",
  content: choiceHTML,
  onInit: (panel) => {
    panel.querySelectorAll("input[name='version']").forEach((radio) => {
      radio.addEventListener("change", (e) => {
        console.log("Selected version:", e.target.value);
      });
    });
  }
});
```

---

## Notes

- **Panel Order**: Panels are rendered in registration order. Users can drag to reorder, and the order persists during the session.
- **Search**: Filters panels by matching title or text content (case-insensitive).
- **Drag & Drop**: Only works via the drag handle at the top of each panel. Clicking inputs/buttons won't trigger drag.
- **Shadow DOM**: The toolbar is isolated in a shadow root, so global styles won't leak in or out.

---

For additional toolbar styling and behavior, see [`TOOLBAR_API.md`](./TOOLBAR_API.md).
