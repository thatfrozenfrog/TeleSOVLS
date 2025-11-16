export const toolbarStyles = `
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
    pointer-events: none;
    opacity: 0.55;
    transform: translateY(0);
    filter: saturate(0.65);
    border-style: dashed;
    animation: none;
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

  .th-choice {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.04em;
  }

  .th-choice input[type="checkbox"],
  .th-choice input[type="radio"] {
    margin: 0;
  }

  .th-inline-radio {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .th-inline-radio label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .th-inline-radio input[type="radio"] {
    margin: 0;
    flex-shrink: 0;
  }

  .th-tool-panel input[type="checkbox"],
  .th-tool-panel input[type="radio"] {
    appearance: none;
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid rgba(245, 159, 0, 0.5);
    background: rgba(32, 32, 32, 0.92);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.3);
    transition: border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;
  }

  .th-tool-panel input[type="radio"] {
    border-radius: 50%;
  }

  .th-tool-panel input[type="checkbox"]::after,
  .th-tool-panel input[type="radio"]::after {
    content: "";
    position: absolute;
    inset: 4px;
    border-radius: 4px;
    background: rgba(245, 159, 0, 0.85);
    transform: scale(0.6);
    opacity: 0;
    transition: opacity 140ms ease, transform 140ms ease;
  }

  .th-tool-panel input[type="radio"]::after {
    border-radius: 50%;
    transform: scale(0.4);
  }

  .th-tool-panel input[type="checkbox"]:checked,
  .th-tool-panel input[type="radio"]:checked {
    border-color: rgba(245, 159, 0, 0.9);
    box-shadow: 0 0 0 2px rgba(245, 159, 0, 0.25);
  }

  .th-tool-panel input[type="checkbox"]:checked::after,
  .th-tool-panel input[type="radio"]:checked::after {
    opacity: 1;
    transform: scale(1);
  }

  .th-tool-panel input[type="checkbox"]::after {
    border-radius: 2px;
    clip-path: polygon(14% 44%, 0 62%, 48% 100%, 100% 12%, 82% 0, 44% 68%);
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
