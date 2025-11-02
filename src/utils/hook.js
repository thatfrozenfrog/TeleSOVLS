export function hook() {
  const s = document.createElement("script");
  s.textContent = `(${code.toString()})()`;
  s.async = false;
  s.defer = false;
  document.documentElement.appendChild(s);

  s.remove();

  // After injecting the hook into the page, give it a short window to install the
  // WebSocket capture getter. If no socket is available after the timeout, prompt
  // the user to hard-refresh so the hook can run earlier in the page lifecycle.
  (function checkSocket(timeoutMs = 3000, pollMs = 100) {
    const start = Date.now();
    const tick = () => {
      try {
        if (window.socket) return;
      } catch (_) {}

      if (Date.now() - start >= timeoutMs) {
        const ok = confirm(
          "WebSocket was not captured. Hard-refresh the page now (reload without cache)?",
        );
        if (ok) {
          hardRefresh();
        } else {
          alert(
            "If the socket is not captured, try a hard refresh (Ctrl+Shift+R) or reload the page.",
          );
        }
        return;
      }

      setTimeout(tick, pollMs);
    };
    tick();
  })();
}

const code = () => {
  window.__capturedSockets = window.__capturedSockets || [];

  const RealWS = window.WebSocket;
  window.WebSocket = function (url, proto) {
    const ws = proto ? new RealWS(url, proto) : new RealWS(url);
    window.__capturedSockets.push(ws);
    console.log("[hook] captured", ws.url, ws.readyState);
    return ws;
  };
  window.WebSocket.prototype = RealWS.prototype;
  Object.assign(window.WebSocket, RealWS);

  try {
    Object.defineProperty(window, "socket", {
      get() {
        const arr = window.__capturedSockets || [];
        return arr.find((s) => s && s.readyState === 1) || arr[arr.length - 1];
      },
      configurable: true,
    });
  } catch (_) {
    alert("WebSocket failed to hook. Press Ctrl + Shift + R to hard refresh.");
  }
};

function hardRefresh() {
  const url = new URL(window.location.href);
  url.searchParams.set("refresh", Date.now());
  window.location.href = url.toString();
}

window.addEventListener("th:theme-applied", () => {
  console.log("Theme applied (from hook)");
});
