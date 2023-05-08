const fs = require('fs');
const path = require('path');
let result = '';
 const readStream = fs.createReadStream(path.join(`${__dirname}`, 'text.txt'), 'utf-8');

  readStream.on('data', chunk => {
      result += chunk;
  })
  readStream.on('end',()=>{
      process.stdout.write(result);
  })
