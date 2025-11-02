const offsetArray = [
	'35524f434b2f434b',
	'4c47544f31392f434b',
	'3438395351442f434b',
	'424f4d4231372f434b',
	'57524d34454e472f434b',
	'574d454e4c55562f434b',
	'454e4744505433332f434b',
	'414952464c2f38322f434b',
	'33303541524546572f434b',
	'544143454e472f524c2f434b',
	'5553414638424752502f434b'
]

const fs = require('fs')

const data = fs.readFileSync('/home/user/satan.txt', 'utf8')

const hexArray = data.match(/[0-9a-f]+/g)

for (let i = 0; i < hexArray.length; i += 17)
	delete hexArray[i]

const clearArray = hexArray.filter(x => x).join('')

let position = -1

for (let i = 0; i < offsetArray.length; ++i) {
	position = clearArray.search(offsetArray[i])
	if (position != -1)
		break
}

const row = Math.floor(position / 2 / 16);
const column = Math.floor(position / 2 % 16);

console.log(row.toString(16).padStart(2, '0') + column.toString(16))
