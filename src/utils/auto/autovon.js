import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import {
  createUI,
  registerToggleTool,
  createInputControl,
  createCheckboxControl,
} from "../ui.js";

let loopActive = false;

function setAutovonEnabled(enabled) {
  if (typeof window !== "undefined") {
    window.__autovonenabled = enabled;
  }

  if (enabled) {
    autovon().catch((error) => {
      console.error("[autovon] failed", error);
    });
  }
}
export function initAutovonUI() {
  registerToggleTool({
    id: "th-autovon",
    title: "Autovon",
    description: "Automatically parse and complete autovon.",
    initialChecked: false,
    persist: true,
    onToggleChange: (checked) => {
      setAutovonEnabled(checked);
    },
    onReady: ({ checkbox, content }) => {
      setAutovonEnabled(checkbox.checked);
    },
  });
}

async function autovon() {
  let socket = window.socket;

  if (loopActive) return;
  loopActive = true;
  console.log("Autovon started");
  try {
    while (window.__autovonenabled) {
      if (
        terminal.getCurrentLine().includes("[ Press any key to continue ]") &&
        terminal.getLastLines(3)[0].includes("--> Sending payload")
      ) {
        socket.send("a");
        await terminal.waitUntil("Response?", { timeoutMs: 20000 });
        const dump = terminal.getLastLines(14).slice(0, 12).join("\n");
        console.log("Detected AUTOVON, processing...");
        console.log(dump);
        const sol = solve(dump);
        console.log("Autovon result: " + sol);
        socket.send(sol);
        keyboard.sendkey("Enter");
      }

      await sleep(250);
    }
  } finally {
    loopActive = false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const freq = {
  1: [697, 1209],
  2: [697, 1336],
  3: [697, 1477],
  A: [697, 1633],
  4: [770, 1209],
  5: [770, 1336],
  6: [770, 1477],
  B: [770, 1633],
  7: [852, 1209],
  8: [852, 1336],
  9: [852, 1477],
  C: [852, 1633],
  "*": [941, 1209],
  0: [941, 1336],
  "#": [941, 1477],
  D: [941, 1633],
};

export function solve(input) {
  const inputData = input;
  const hexNumbers = inputData.match(/0x[0-9A-F]+/gi).map((h) => h.slice(2));
  const decodedNumbers = hexNumbers.map((h) =>
    Math.trunc(
      new DataView(
        new Uint8Array(
          h.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
        ).buffer,
      ).getFloat32(0, false),
    ),
  );
  let result = "";

  for (let i = 0; i < decodedNumbers.length; i += 2) {
    const pair = [decodedNumbers[i], decodedNumbers[i + 1]].sort(
      (a, b) => a - b,
    );
    for (const [key, value] of Object.entries(freq)) {
      if (pair[0] === value[0] && pair[1] === value[1]) {
        result += key;
        break;
      }
    }
  }

  return result;
}
