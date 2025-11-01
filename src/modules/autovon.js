const freqMap = {
    '[697,1209]': '1',
    '[697,1336]': '2',
    '[697,1477]': '3',
    '[697,1633]': 'A',
    '[770,1209]': '4',
    '[770,1336]': '5',
    '[770,1477]': '6',
    '[770,1633]': 'B',
    '[852,1209]': '7',
    '[852,1336]': '8',
    '[852,1477]': '9',
    '[852,1633]': 'C',
    '[941,1209]': '*',
    '[941,1336]': '0',
    '[941,1477]': '#',
    '[941,1633]': 'D'
}

const hexToFloat32 = hex => {
    const intValue = parseInt(hex, 16);
    const uint32Array = new Uint32Array([intValue]);
    const dataView = new DataView(uint32Array.buffer);
    return dataView.getFloat32(0, true);
};

const fs = require('fs')
const data = fs.readFileSync('/home/user/autovon.txt','utf8')
const hexArray = data.match(/0x[0-9A-F]+/gi)

// swaps endianness
const freqArray = hexArray.map(hexToFloat32)

let keyArray = []

for (let i = 0; i < (freqArray.length); i += 2){
	let singleKey = [freqArray[i], freqArray[i+1]]
	singleKey.sort((a, b) => a - b)
	keyArray.push(singleKey)
}

let seq = ''

for (let i = 0; i < (keyArray.length); ++i){
	seq += freqMap[JSON.stringify(keyArray[i])]
}

// resulting sequence
console.log(seq)
