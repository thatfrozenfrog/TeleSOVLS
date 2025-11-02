# Toolbar API Documentation

## Overview

The TeleSOVLS toolbar surfaces utilities inside a compact hamburger menu anchored to the bottom‑right corner of the page. The UI renders inside a shadow root with a custom neon cyberpunk theme—black glass surfaces, radiant green outlines, and a glowing rounded-square toggle button—so the host site’s styles remain untouched.

## Architecture

- `src/utils/ui.js` – toolbar infrastructure (hamburger button, panel management, registration API)
- `src/utils/theme.js` – example tool that exposes the theme selector

## Adding New Tools

You can register a tool with either a shorthand signature or an options object.

```javascript
import { registerTool } from "./utils/ui.js";

// Shorthand signature: registerTool(id, content, onInit?)
registerTool("my-tool", "<h3>Tool</h3><p>Hello!</p>", (panel) => {
  console.log("panel mounted", panel);
});

// Options object: registerTool({ id, content, onInit })
registerTool({
  id: "my-tool",
  content: () => {
    const el = document.createElement("div");
    el.innerHTML = `
      <h3>My Tool</h3>
      <button id="my-button" class="contrast">Click Me</button>
    `;
    return el;
  },
  onInit: (panel) => {
    panel.querySelector("#my-button")?.addEventListener("click", () => {
      console.log("Button clicked!");
    });
  },
});
```

`content` may be:

- An `HTMLElement`
- A string containing HTML
- A factory function that returns an `HTMLElement`

The optional `onInit(panel)` callback runs after the panel has been inserted into the toolbar.

## API Reference

### `registerTool(id, content, onInit?)`
### `registerTool(options)`

Registers a new panel inside the toolbar.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | ✓ | Unique identifier for the panel. Re‑registering the same id returns the existing panel. |
| `content` | `HTMLElement \| string \| () => HTMLElement` | ✓ | Panel body. Factory functions are invoked immediately. |
| `onInit` | `(panel: HTMLElement) => void` | ✕ | Hook invoked after the panel is added to the DOM. |

**Returns:** the created panel `HTMLElement` (or the existing one if the id was already registered).

### `createUI()`

Legacy helper that forcibly initializes the toolbar. The toolbar now self‑initializes on the first `registerTool` call, so this is rarely necessary.

## Styling & Layout

- Panels render as glossy, neon-accented cards with rounded corners, green outlines, and a subtle entrance animation.
- Typography inherits the JetBrains Mono / Fira Code stack inside the shadow root for a futuristic terminal vibe.
- Panels align to the left of the hamburger button; opening the toolbar reveals every registered panel simultaneously.
- Because everything lives inside a shadow root, your tool markup can safely define its own classes or inline styles without colliding with the host page.

If you need bespoke styling, attach classes/inline styles to your content element. You can also append a `<style>` tag inside your tool content for scoped overrides.

## Toolbar Behavior

- **Open / Close:** clicking the hamburger toggles all panels.
- **Outside click:** clicking outside the toolbar closes it.
- **Keyboard:** pressing `Esc` closes the toolbar.
- **Multiple tools:** every registered tool is shown together when the toolbar opens.

## Best Practices

1. Use descriptive, unique ids (prefix with `th-` to stay consistent).
2. Keep tool layouts simple—small forms or status blocks work best.
3. Clean up external event listeners or timers created by your tool.
4. Persist user preferences with `localStorage` (wrap access in `try/catch`).
5. Prefer semantic HTML—labels for inputs, headings for section titles, etc.

## Example: Theme Selector Tool

See `src/utils/theme.js` for a complete example. It registers a dropdown panel, loads the saved theme from `localStorage` during `onInit`, and reacts to dropdown changes to apply themes in real time.
