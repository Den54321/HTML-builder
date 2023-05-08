const fs = require('fs');
const fsPramis = require('fs/promises');
const pach = require('path');
const pachStule = pach.join(__dirname, 'styles');
const pachProject  = pach.join(__dirname, 'project-dist');
const pachBundleFile = pach.join(__dirname, 'project-dist', 'bundle.css');
fs.writeFile(pachBundleFile,'', (err)=>{});
const pramisReadFolder = fsPramis.readdir(pachStule, { withFileTypes: true });
pramisReadFolder.then(
    (res) =>{
        res.forEach((item) => {
            if(!item.isDirectory()){
                if(pach.extname(pach.join(pachStule, item.name)) === '.css'){

                    fs.readFile(pach.join(pachStule, item.name),(err, data)=>{

                        fs.appendFile(pachBundleFile, data, error=>{});

                    })

                }
            }
        })
        
    },

    err=>{

    }
)