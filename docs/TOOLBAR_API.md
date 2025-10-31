# Toolbar API Documentation

## Overview

The TeleSOVLS toolbar provides an extensible system for adding tools and features via a hamburger menu interface. The toolbar appears in the bottom-right corner with a glowing green hamburger button.

## Architecture

- **`src/utils/ui.js`** - Core toolbar infrastructure (hamburger button, panel management)
- **`src/utils/theme.js`** - Theme management and theme selector tool implementation

## Adding New Tools

To add a new tool to the toolbar, use the `registerTool` function:

```javascript
import { registerTool } from "./utils/ui.js";

// Create your tool's content
const myToolContent = document.createElement("div");
myToolContent.innerHTML = `
  <label>My Tool</label>
  <button id="my-button">Click Me</button>
`;

// Register the tool
registerTool({
  id: "my-unique-tool-id",           // Unique identifier for the tool
  content: myToolContent,             // HTMLElement or HTML string
  onInit: (panel) => {                // Optional callback after panel is added
    const button = panel.querySelector("#my-button");
    button.addEventListener("click", () => {
      console.log("Button clicked!");
    });
  }
});
```

## API Reference

### `registerTool(options)`

Register a new tool with the toolbar.

**Parameters:**
- `options.id` (string, required) - Unique identifier for the tool panel
- `options.content` (HTMLElement|string, required) - Content to display (DOM element or HTML string)
- `options.onInit` (Function, optional) - Callback invoked after the panel is added to the DOM. Receives the panel element as an argument.

**Returns:** HTMLElement - The created panel element

**Example:**
```javascript
const panel = registerTool({
  id: "my-tool",
  content: "<h3>My Tool</h3><p>Tool content here</p>",
  onInit: (panel) => {
    // Initialize event listeners, load saved state, etc.
  }
});
```

### `createUI()`

Legacy function for backward compatibility. Initializes the toolbar infrastructure. This is now called automatically when the first tool is registered, so you typically don't need to call it explicitly.

## Example: Theme Selector Tool

The theme selector is implemented in `src/utils/theme.js` using the toolbar API:

```javascript
import { registerTool } from "./utils/ui.js";

export function initThemeTool() {
  const content = document.createElement("div");
  // ... create dropdown and label ...

  registerTool({
    id: "th-theme-selector",
    content: content,
    onInit: (panel) => {
      const dropdown = panel.querySelector("#th-theme-dropdown");
      dropdown.addEventListener("change", (e) => {
        changeTheme(e.target.value);
      });
      // Load saved theme from localStorage
    }
  });
}
```

## Styling

Tools inherit base styles from the `.th-tool-panel` class:
- White background with slight transparency
- Rounded corners
- Drop shadow
- Positioned bottom-right, aligned with hamburger button

To customize a specific tool's appearance, target its unique ID:

```css
#my-unique-tool-id {
  min-width: 300px;
  background: rgba(0, 0, 0, 0.9);
  color: #00ff00;
}
```

## Toolbar Behavior

- **Open/Close**: Click the hamburger button to toggle all tool panels
- **Outside Click**: Clicking outside the toolbar closes all panels
- **Escape Key**: Press Escape to close the toolbar
- **Panel Positioning**: Panels appear to the left of the hamburger button
- **Multiple Tools**: All registered tools appear simultaneously when the toolbar opens

## Best Practices

1. **Unique IDs**: Always use unique, descriptive IDs for your tools
2. **Event Cleanup**: If your tool needs cleanup, track registered listeners
3. **State Persistence**: Use localStorage for saving user preferences
4. **Error Handling**: Wrap localStorage access in try-catch blocks
5. **Initialization Order**: Register tools after DOM is ready
6. **Content Structure**: Use semantic HTML and proper labels for accessibility

## Future Enhancements

Potential improvements to consider:
- Individual panel toggle (show/hide specific tools independently)
- Panel reordering/drag-and-drop
- Tool categories/groups
- Keyboard shortcuts for specific tools
- Animation/transition effects
- Responsive positioning for small viewports
