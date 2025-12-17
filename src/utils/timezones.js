const STYLE_ID = "th-timezone-widget-style";
const WIDGET_ID = "th-timezone-widget";
const OPEN_CLASS = "th-tz-open";

const TIMEZONE_ENTRIES = [
  { id: "amerimutts", label: "AMERIMUTTS", timeZone: "America/New_York" },
  { id: "latinxgods", label: "LATINXGODS", timeZone: "America/Sao_Paulo" },
  { id: "africabvlls", label: "AFRICABVLLS", timeZone: "Europe/Paris" },
  { id: "euromutts", label: "EUROMUTTS", timeZone: "Europe/Berlin" },
  { id: "pajeets", label: "PAJEETS", timeZone: "Asia/Kolkata" },
  { id: "asians", label: "ASIANS", timeZone: "Asia/Singapore" },
  {
    id: "australiaryans",
    label: "AUSTRALIARYANS",
    timeZone: "Australia/Sydney",
  },
];

const STATUS_RULES = [
  { name: "sleeping", label: "Sleeping", color: "#f472b6", from: 0, to: 6 },
  {
    name: "partially-inactive",
    label: "Partially Inactive",
    color: "#facc15",
    from: 6,
    to: 10,
  },
  {
    name: "mostly-active",
    label: "Mostly Active",
    color: "#34d399",
    from: 10,
    to: 18,
  },
  {
    name: "fully-active",
    label: "Fully Active",
    color: "#38bdf8",
    from: 18,
    to: 24,
  },
];

let widgetRoot = null;
let updateTimer = null;
const formatterCache = new Map();

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    #${WIDGET_ID} {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 2147483645;
      color: #f8fafc;
      font-family: 'JetBrains Mono', monospace;
      pointer-events: auto;
      user-select: none;
    }

    #${WIDGET_ID} * {
      box-sizing: border-box;
    }

    #${WIDGET_ID} button {
      font-family: inherit;
    }

    #${WIDGET_ID} .th-tz-toggle {
      background: linear-gradient(135deg, #0f172a, #111827);
      border: 1px solid #1f2937;
      color: #e2e8f0;
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3px;
      cursor: grab;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.02);
      transition: transform 120ms ease, box-shadow 120ms ease;
      width: 140px;
      text-align: center;
    }

    #${WIDGET_ID} .th-tz-toggle:active {
      cursor: grabbing;
      transform: translateY(1px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.04);
    }

    #${WIDGET_ID}.${OPEN_CLASS} .th-tz-toggle {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    #${WIDGET_ID} .th-tz-panel {
      display: none;
      margin-top: 8px;
      background: rgba(10, 12, 17, 0.95);
      border: 1px solid #1f2937;
      border-radius: 12px;
      padding: 14px 16px;
      width: 280px;
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(2px);
    }

    #${WIDGET_ID}.${OPEN_CLASS} .th-tz-panel {
      display: block;
    }

    #${WIDGET_ID} .th-tz-heading {
      margin: 0 0 8px 0;
      padding-bottom: 6px;
      border-bottom: 1px solid #111827;
      font-size: 13px;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: #e5e7eb;
    }

    #${WIDGET_ID} .th-tz-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #${WIDGET_ID} .th-tz-row {
      padding: 8px 0;
      border-bottom: 1px solid #0f172a;
    }

    #${WIDGET_ID} .th-tz-row:last-of-type {
      border-bottom: none;
    }

    #${WIDGET_ID} .th-tz-name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: #e2e8f0;
      font-size: 13px;
    }

    #${WIDGET_ID} .th-tz-time {
      font-variant-numeric: tabular-nums;
      color: #cbd5e1;
    }

    #${WIDGET_ID} .th-tz-status {
      margin-top: 4px;
      font-size: 12px;
      color: #cbd5e1;
      letter-spacing: 0.1px;
    }

    #${WIDGET_ID} .th-tz-status[data-state='sleeping'] {
      color: #f472b6;
    }

    #${WIDGET_ID} .th-tz-status[data-state='partially-inactive'] {
      color: #facc15;
    }

    #${WIDGET_ID} .th-tz-status[data-state='mostly-active'] {
      color: #34d399;
    }

    #${WIDGET_ID} .th-tz-status[data-state='fully-active'] {
      color: #38bdf8;
    }
  `;

  document.head.appendChild(style);
}

function getFormatter(timeZone) {
  if (formatterCache.has(timeZone)) {
    return formatterCache.get(timeZone);
  }
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  formatterCache.set(timeZone, formatter);
  return formatter;
}

function getTimeParts(entry) {
  const formatter = getFormatter(entry.timeZone);
  const parts = formatter.formatToParts(new Date());
  const lookup = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const hour = Number(lookup.hour ?? 0);
  const minute = Number(lookup.minute ?? 0);
  const second = Number(lookup.second ?? 0);
  const formatted = `${lookup.hour ?? "00"}:${lookup.minute ?? "00"}:${lookup.second ?? "00"}`;

  return { hour, minute, second, formatted };
}

function getStatusForHour(hour) {
  const normalized = Number.isFinite(hour) ? hour : 0;
  const rule = STATUS_RULES.find(
    ({ from, to }) => normalized >= from && normalized < to,
  );
  return rule ?? STATUS_RULES[STATUS_RULES.length - 1];
}

function buildRow(entry) {
  const row = document.createElement("div");
  row.className = "th-tz-row";

  const nameRow = document.createElement("div");
  nameRow.className = "th-tz-name-row";

  const label = document.createElement("span");
  label.textContent = `${entry.label}:`;

  const time = document.createElement("span");
  time.className = "th-tz-time";
  time.textContent = "--:--:--";

  nameRow.append(label, time);

  const status = document.createElement("div");
  status.className = "th-tz-status";
  status.textContent = "--";
  status.dataset.state = "sleeping";

  row.append(nameRow, status);

  return { row, time, status };
}

function updateRows(rows) {
  TIMEZONE_ENTRIES.forEach((entry) => {
    const target = rows.get(entry.id);
    if (!target) return;

    const timeParts = getTimeParts(entry);
    const state = getStatusForHour(timeParts.hour);

    target.time.textContent = timeParts.formatted;
    target.status.textContent = state.label;
    target.status.dataset.state = state.name;
  });
}

function setupDragging(toggleButton, onToggle) {
  let dragState = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const onPointerDown = (ev) => {
    if (!(ev instanceof PointerEvent)) return;
    const rect = widgetRoot.getBoundingClientRect();
    dragState = {
      pointerId: ev.pointerId,
      startX: ev.clientX,
      startY: ev.clientY,
      startLeft: rect.left,
      startTop: rect.top,
      moved: false,
    };
    toggleButton.setPointerCapture(ev.pointerId);
  };

  const onPointerMove = (ev) => {
    if (!dragState || ev.pointerId !== dragState.pointerId) return;
    const dx = ev.clientX - dragState.startX;
    const dy = ev.clientY - dragState.startY;
    if (!dragState.moved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
      dragState.moved = true;
    }

    const rect = widgetRoot.getBoundingClientRect();
    const nextRight =
      window.innerWidth - (dragState.startLeft + rect.width) + dx;
    const nextTop = dragState.startTop + dy;

    const maxRight = Math.max(8, nextRight);
    const maxTop = Math.max(8, window.innerHeight - rect.height - 8);

    widgetRoot.style.right = `${clamp(maxRight, 8, window.innerWidth - 8)}px`;
    widgetRoot.style.top = `${clamp(nextTop, 8, maxTop)}px`;
    widgetRoot.style.left = "auto";
    widgetRoot.style.bottom = "auto";
  };

  const onPointerUp = (ev) => {
    if (!dragState || ev.pointerId !== dragState.pointerId) return;
    toggleButton.releasePointerCapture?.(ev.pointerId);
    const wasMoved = dragState.moved;
    dragState = null;
    if (!wasMoved) {
      onToggle();
    }
  };

  const onPointerCancel = (ev) => {
    if (!dragState || ev.pointerId !== dragState.pointerId) return;
    toggleButton.releasePointerCapture?.(ev.pointerId);
    dragState = null;
  };

  toggleButton.addEventListener("pointerdown", onPointerDown);
  toggleButton.addEventListener("pointermove", onPointerMove);
  toggleButton.addEventListener("pointerup", onPointerUp);
  toggleButton.addEventListener("pointercancel", onPointerCancel);

  toggleButton.addEventListener("dragstart", (event) => event.preventDefault());

  toggleButton.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onToggle();
    }
  });
}

export function initTimezoneWidget() {
  if (widgetRoot) return widgetRoot;
  if (typeof document === "undefined") return null;

  ensureStyles();

  widgetRoot = document.createElement("section");
  widgetRoot.id = WIDGET_ID;
  widgetRoot.className = "th-tz-collapsed";
  widgetRoot.setAttribute("aria-expanded", "false");
  widgetRoot.setAttribute("aria-label", "Timezones");

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "th-tz-toggle";
  toggleButton.textContent = "Timezones";

  const panel = document.createElement("div");
  panel.className = "th-tz-panel";
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-label", "Timezone activity");
  panel.setAttribute("aria-hidden", "true");

  const heading = document.createElement("h3");
  heading.className = "th-tz-heading";
  heading.textContent = "Timezones";

  const list = document.createElement("div");
  list.className = "th-tz-list";

  const rows = new Map();
  TIMEZONE_ENTRIES.forEach((entry) => {
    const elements = buildRow(entry);
    rows.set(entry.id, elements);
    list.appendChild(elements.row);
  });

  panel.append(heading, list);
  widgetRoot.append(toggleButton, panel);
  document.body.appendChild(widgetRoot);

  const togglePanel = () => {
    const isOpen = widgetRoot.classList.toggle(OPEN_CLASS);
    widgetRoot.setAttribute("aria-expanded", isOpen ? "true" : "false");
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");
  };

  setupDragging(toggleButton, togglePanel);

  const update = () => {
    updateRows(rows);
    panel.setAttribute(
      "aria-hidden",
      widgetRoot.classList.contains(OPEN_CLASS) ? "false" : "true",
    );
  };

  update();
  updateTimer = window.setInterval(update, 1000);

  return widgetRoot;
}

export function disposeTimezoneWidget() {
  if (updateTimer) {
    window.clearInterval(updateTimer);
    updateTimer = null;
  }
  if (widgetRoot) {
    widgetRoot.remove();
    widgetRoot = null;
  }
}
