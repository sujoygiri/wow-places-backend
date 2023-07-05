var fs = require('fs');
const { exit } = require('process');

var data = '';

async function readStream() {

var readStream = fs.createReadStream('./images/51fdd2e8820213dd1618.jpeg',{ highWaterMark: 1 * 1024, encoding: 'hex' });

// readStream.on('data', function(chunk) {
//     data += chunk;
//     console.log('chunk Data : ')
//     console.log(chunk);// your processing chunk logic will go here
// })

for await(const chunk of readStream) {
    console.log('chunk Data : ')
    console.log(chunk);
    break;
}

}

readStream();