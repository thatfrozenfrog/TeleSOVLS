export function hook() {
  const s = document.createElement("script");
  s.textContent = `(${code.toString()})()`;
  s.async = false;
  s.defer = false;
  document.documentElement.appendChild(s);
  s.remove();
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
  } catch (_) {}
};

function hardRefresh() {
  const url = new URL(window.location.href);
  url.searchParams.set("refresh", Date.now());
  window.location.href = url.toString();
}

window.addEventListener("th:theme-applied", () => {
  console.log("Theme applied (from hook)");
  if (window.socket === undefined) {
    alert("WebSocket not captured! Press Ctrl + F5 to hard refresh.");
  }
});
