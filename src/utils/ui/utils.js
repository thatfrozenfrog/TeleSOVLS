// Utility functions

export function toTitleCase(value) {
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

export function createToolContentWrapper() {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  return container;
}
