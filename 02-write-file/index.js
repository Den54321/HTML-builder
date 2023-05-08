const fs  = require('fs');
const path = require('path');
const { exit } = require('process');
const { stdin, stdout} = process;
const  writeStream = fs.createWriteStream(`${path.join(__dirname, 'text.txt')}`);
let ext = Buffer.from('exit\r\n', 'utf-8');
fs.writeFile(`${path.join(__dirname, 'text.txt')}`,'', (err)=>{
    if (err) throw err;
});

stdout.write('Введите текст для записи.\n');

stdin.on('data', function(data){
    if(data.toString() === ext.toString()) process.exit(1);
    writeStream.write(data);
    
});


process.on('exit', code =>{
    if(code === 1) stdout.write('Запись завершена\n');
 });
process.on('SIGINT', ()=>{
    stdout.write('Запись завершена\n');
    process.exit();
})