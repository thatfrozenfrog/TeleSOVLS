import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import {
  createUI,
  registerToggleTool,
  createInputControl,
  createCheckboxControl,
} from "../ui.js";

let checkboxelem = null;
let loopActive = false;

function setAutologinEnabled(enabled) {
  if (typeof window !== "undefined") {
    window.__autologinenabled = enabled;
  }
  if (checkboxelem && checkboxelem.checked !== enabled) {
    checkboxelem.checked = enabled;
  }
  if (enabled) {
    autoLogin().catch((error) => {
      console.error("[autologin] failed", error);
    });
  }
}

export function initAutologinUI() {
  registerToggleTool({
    id: "th-autologin",
    title: "Auto Login",
    description: "Automatically fills in credentials when prompted.",
    initialChecked: false,
    persist: true,
    onToggleChange: (checked) => {
      setAutologinEnabled(checked);
    },
    onReady: ({ checkbox, content }) => {
      checkboxelem = checkbox;

      const username = createInputControl({
        label: "Username",
        type: "text",
        id: "th-autologin-username",
        persist: true,
        onChange: (val) => {
          window.__autologinusername = val;
          return val;
        },
      });

      const password = createInputControl({
        label: "Password",
        type: "password",
        id: "th-autologin-password",
        persist: true,
        onChange: (val) => {
          window.__autologinpassword = val;
          return val;
        },
      });

      const guest = createCheckboxControl({
        id: "th-autologin-guest",
        label: "As guest",
        persist: true,
        onChange: (checked) => {
          window.__autologinguest = checked;
        },
      });

      if (guest.checkbox.checked) {
        window.__autologinguest = true;
      }

      content.appendChild(username.wrapper);
      content.appendChild(password.wrapper);
      content.appendChild(guest.wrapper);
      if (username.input.value) {
        window.__autologinusername = username.input.value;
      }
      if (password.input.value) {
        window.__autologinpassword = password.input.value;
      }
      setAutologinEnabled(checkbox.checked);
    },
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendCredentials() {
  if (window.__autologinguest) {
    console.log("[autologin] sending as guest");
    window.socket.send("guest");
    keyboard.sendkey("Enter");
    return;
  }

  if (!window.__autologinusername) {
    return;
  }
  console.log(
    "debug: sending credentials:",
    window.__autologinusername,
    window.__autologinpassword ? "******" : "(no password)",
  );
  window.socket.send(window.__autologinusername);
  keyboard.sendkey("Enter");
  if (window.__autologinpassword) {
    window.socket.send(window.__autologinpassword);
    keyboard.sendkey("Enter");
  }
}

async function autoLogin() {
  let socket = window.socket;

  if (loopActive) {
    return;
  }

  loopActive = true;
  try {
    while (window.__autologinenabled) {
      if (
        terminal
          .getLastLines(2)[0]
          .includes(
            "Type NEWUSER to create an account. Press control-C to interrupt any command.",
          )
      ) {
        console.log("[autologin] Detected login prompt, sending credentials");
        window.socket.send("login ");
        await sendCredentials();
        await terminal.waitUntil("@");
      }
      if (terminal.getCurrentLine().match(/^Name \(.+:.+\):/)) {
        console.log("[autologin] Detected login prompt, sending credentials");
        await sendCredentials();
        await terminal.waitUntil("ftp>");
      }
      if (
        [/Login:/i, /Username:/i].some((prompt) =>
          terminal.getCurrentLine().match(prompt),
        )
      ) {
        console.log("[autologin] Detected login prompt, sending credentials");
        if (window.__autologinguest) {
          window.socket.send("guest");
          keyboard.sendkey("Enter");
        } else {
          await sendCredentials();
        }
        await sleep(1000);
      }
      if (terminal.getCurrentLine().includes("Press any key to continue =>")) {
        console.log(
          "[autologin] Detected 'Press any key to continue' prompt, sending key",
        );
        keyboard.sendkey(" ");
        await terminal.waitUntil("Username>");
        if (window.__autologinguest) {
          window.socket.send("guest");
          keyboard.sendkey("Enter");
        } else {
          await sendCredentials();
        }
      }
      await sleep(250);
    }
  } finally {
    loopActive = false;
  }
}
