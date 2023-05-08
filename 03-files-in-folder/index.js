
const fsPromises = require('fs/promises');
const fs = require('fs');
const pach = require('path');

const pachFolder = pach.join(__dirname, 'secret-folder');
let pramise = fsPromises.readdir(pachFolder, { withFileTypes: true });

pramise.then(
    res => {
        res.forEach( item => {
            if(!item.isDirectory()){

               let name = item.name;
               let extens = pach.extname(pach.join(pachFolder, name));
                 fs.stat(pach.join(pachFolder, name), (err, stats) => {
                 let siz = stats.size;
                 ((name, extens) =>{
                   name = name.slice(0, name.length - extens.length);
                   process.stdout.write(`${name} - ${extens} - ${siz} \n`);
                 })(name, extens);
               })

            }
        })
    },

    err =>{
        process.stdout.write('Error');
    }

);
