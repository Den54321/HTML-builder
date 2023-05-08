const fs = require('fs');
const fspromises = require('fs/promises');
const pach = require('path');
const pachFolder = pach.join(__dirname, 'files');

const promise  = fspromises.mkdir(pach.join( __dirname, 'files-copy'), { recursive: true });

promise.then(
    (res) =>{
    if(!res){
        fs.readdir(pach.join(__dirname, 'files-copy'), (err, res)=>{
            res.forEach( item =>{
                fs.unlink(pach.join(__dirname, 'files-copy', item), (err)=>{})   
            })   
          })  

    }

       fs.readdir(pachFolder, (err, res)=>{
         res.forEach( item =>{

          fs.copyFile(pach.join(pachFolder, item), pach.join(__dirname, 'files-copy', item),()=>{});

         })
         
       }) 
        
    },
    err=>{

    }
)

