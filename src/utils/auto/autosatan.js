import * as terminal from "../terminal.js";
import * as keyboard from "../keyboard.js";
import {
  createUI,
  registerToggleTool,
  createInputControl,
  createCheckboxControl,
} from "../ui.js";

let loopActive = false;

function setAutoSatanEnabled(enabled) {
  if (typeof window !== "undefined") {
    window.__autosatanenabled = enabled;
  }

  if (enabled) {
    autoSatan().catch((error) => {
      console.error("[autosatan] failed", error);
    });
  }
}
export function initAutosatanUI() {
  registerToggleTool({
    id: "th-autosatan",
    title: "Auto Satan",
    description: "Automatically parse and complete satan memdump.",
    initialChecked: false,
    persist: true,
    onToggleChange: (checked) => {
      setAutoSatanEnabled(checked);
    },
    onReady: ({ checkbox, content }) => {
      setAutoSatanEnabled(checkbox.checked);
    },
  });
}

async function autoSatan() {
  let socket = window.socket;

  if (loopActive) return;
  loopActive = true;
  console.log("AutoSatan started");
  try {
    while (window.__autosatanenabled) {
      if (terminal.getCurrentLine().includes("// offset>")) {
        let cur = ["-"];
        let i = 2;
        while (cur[0].includes("00 |") == false) {
          cur = terminal.getLastLines(i);
          i++;
          await sleep(10);
        }
        i--;
        const dump = terminal.getLastLines(i).slice(0, -2).join("\n");
        console.log("Detected MEMDUMP, processing...");
        console.log(dump);
        const command = satan(dump);
        socket.send(command);
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

function formatize(data) {
  const lines = data
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const hexData = lines.map((line) => line.split("|")[1].trim()).join(" ");
  return hexData;
}

function cleanHex(inputStr) {
  inputStr = inputStr.toUpperCase();
  const cleanedHex = inputStr.replace(/[^A-F0-9]/g, "");
  return cleanedHex;
}

function convert(input) {
  const patterns = [
    "454E4744505433332F434B",
    "424F4D4231372F434B",
    "57524D34454E472F434B",
    "574D454E4C55562F434B",
    "544143454E472F524C2F434B",
    "5553414638424752502F434B",
    "414952464C2F38322F434B",
    "4C47544F31392F434B",
    "35524F434B2F434B",
    "3438395351442F434B",
    "33303541524546572F434B",
  ];

  const data = input;
  let data1 = formatize(data);
  let cleanedHex = cleanHex(data1);
  console.log(cleanedHex);

  let posicion = -1;
  for (let pattern of patterns) {
    posicion = cleanedHex.indexOf(pattern);
    if (posicion !== -1) {
      break;
    }
  }

  if (posicion === -1) {
    return "Error: Unable to parse MEMDUMP.";
  }

  const filas = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0A",
    "0B",
    "0C",
    "0D",
    "0E",
    "0F",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1A",
    "1B",
    "1C",
    "1D",
    "1E",
    "1F",
  ];
  const columnas = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const mFila = Math.floor(posicion / 2 / 16) + 1;
  const mColumna = (Math.floor(posicion / 2) % 16) + 1;

  const filename = filas[mFila - 1] + columnas[mColumna - 1];
  return filename;
}

export function satan(input) {
  return convert(input);
}
