import swal from "sweetalert";

let themeAlertRegistered = false;
let loadingOverlay = null;
let firstTime = true;
const loadingImageURL = [
  "https://s6.imgcdn.dev/YKQgBo.gif",
  "https://s6.imgcdn.dev/YKQXNK.gif",
  "https://s6.imgcdn.dev/YKiYDN.gif",
  "https://s6.imgcdn.dev/YKQEbO.gif",
  "https://s6.imgcdn.dev/YKQJMn.gif",
  "https://s6.imgcdn.dev/YKQolg.gif",
  "https://s6.imgcdn.dev/YKihyq.gif",
  "https://s6.imgcdn.dev/YKijAB.gif",
  "https://s6.imgcdn.dev/YKiuew.gif",
  "https://s6.imgcdn.dev/YKiwgu.gif",
  "https://s6.imgcdn.dev/YKiMNL.gif",
  "https://s6.imgcdn.dev/YKicGa.gif",
  "https://s6.imgcdn.dev/YKiCMt.gif",
];

function pickLoadingImage() {
  if (!loadingImageURL.length) return "";
  const idx = Math.floor(Math.random() * loadingImageURL.length);
  return loadingImageURL[idx];
}

const SWEETALERT_STYLE_ID = "th-swal-font-style";
function ensureSweetAlertFont() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SWEETALERT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = SWEETALERT_STYLE_ID;
  style.textContent = `
    .swal-modal,
    .swal-title,
    .swal-text,
    .swal-button,
    .swal-content__input,
    .swal-content__textarea {
      font-family: 'JetBrains Mono', monospace !important;
    }
  `;
  (document.head || document.documentElement || document.body)?.appendChild(
    style,
  );
}

function createLoadingOverlayElement() {
  const overlay = document.createElement("div");
  overlay.id = "th-loading-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.8)";
  overlay.style.zIndex = "2147483647";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.gap = "24px";
  overlay.style.color = "#fff";
  overlay.style.fontFamily = "'JetBrains Mono', monospace";
  overlay.style.fontSize = "24px";
  overlay.style.textAlign = "center";

  const text = document.createElement("div");
  text.textContent = "TeleSOVLS loading...";

  const img = document.createElement("img");
  img.src = pickLoadingImage();
  img.alt = "TeleSOVLS loading animation";
  img.style.maxWidth = "320px";
  img.style.width = "60%";
  img.style.borderRadius = "12px";

  overlay.append(text, img);
  return overlay;
}

function showLoadingOverlay() {
  if (loadingOverlay || typeof document === "undefined") return;
  const attach = () => {
    if (loadingOverlay || !document.body) return;
    loadingOverlay = createLoadingOverlayElement();
    document.body.appendChild(loadingOverlay);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach, { once: true });
  } else {
    attach();
  }
}

function hideLoadingOverlay() {
  if (!loadingOverlay) return;
  try {
    loadingOverlay.remove();
  } catch (_) {
    if (loadingOverlay.parentNode) {
      loadingOverlay.parentNode.removeChild(loadingOverlay);
    }
  }
  loadingOverlay = null;
}

function themeAppliedListener() {
  if (firstTime == false) return;
  firstTime = false;
  if (themeAlertRegistered || typeof window === "undefined") return;
  themeAlertRegistered = true;
  try {
    window.addEventListener("th:theme-applied", () => {
      hideLoadingOverlay();
      ensureSweetAlertFont();
      console.log("Theme has been applied.");
      if (window.socket == undefined) {
        swal(
          "WebSocket missing!",
          "Unable to find WebSocket connection. Please create a new tab to establish a new connection.",
          "error",
        );
      } else {
        swal("Hook applied!", "TeleSOVLS is ready to use.", "success");
      }
    });
  } catch (_) {}
}

function themeApplyingListener() {
  window.addEventListener("th:theme-applying", () => {
    console.log("Theme is being applied...");
  });
}

export function hook() {
  const RealWS = window.WebSocket;
  themeApplyingListener();
  themeAppliedListener();
  ensureSweetAlertFont();
  showLoadingOverlay();

  class HookedWebSocket extends RealWS {
    constructor(url, protocols) {
      super(url, protocols);

      const captured =
        window.__capturedSockets ?? (window.__capturedSockets = []);
      captured.push(this);

      if (!window.n) {
        window.n = this;
      }

      if (!window.socket) {
        window.socket = this;
      }

      hideLoadingOverlay();

      console.log("[hook] captured", this.url);
    }
  }
  window.WebSocket = HookedWebSocket;
}
