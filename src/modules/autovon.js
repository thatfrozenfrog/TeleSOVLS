const freqMap = {
  "[697,1209]": "1",
  "[697,1336]": "2",
  "[697,1477]": "3",
  "[697,1633]": "A",
  "[770,1209]": "4",
  "[770,1336]": "5",
  "[770,1477]": "6",
  "[770,1633]": "B",
  "[852,1209]": "7",
  "[852,1336]": "8",
  "[852,1477]": "9",
  "[852,1633]": "C",
  "[941,1209]": "*",
  "[941,1336]": "0",
  "[941,1477]": "#",
  "[941,1633]": "D",
};

const hexToFloat32 = (hex) => {
  const intValue = parseInt(hex, 16);
  const uint32Array = new Uint32Array([intValue]);
  const dataView = new DataView(uint32Array.buffer);
  return dataView.getFloat32(0, true);
};

export function solveAutovon(hexArray) {
  if (!Array.isArray(hexArray)) return "";
  const tokens = [];
  for (const line of hexArray) {
    if (typeof line !== "string") continue;
    const found = line.match(/0x[0-9A-Fa-f]+/g);
    if (found) tokens.push(...found);
  }
  if (tokens.length < 2) return "";

  const freqArray = tokens.map(hexToFloat32);
  let seq = "";
  for (let i = 0; i + 1 < freqArray.length; i += 2) {
    const pair = [freqArray[i], freqArray[i + 1]].sort((a, b) => a - b);
    const ch = freqMap[JSON.stringify(pair)] || "?";
    seq += ch;
  }

  return seq;
}
