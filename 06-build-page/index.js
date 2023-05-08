const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const pathProjgect = path.join(__dirname, 'project-dist');
const pathComponent = path.join(__dirname, 'components');
const pathTemplate = path.join(__dirname, 'template.html');
const pathStyles = path.join(__dirname, 'styles');
const pachAssets = path.join(__dirname, 'assets');

async function deleteFolder(url){
    let  obg = await fsPromises.readdir(url, { withFileTypes: true })
    for(let i = 0; i< obg.length; i++)
    {
        if(!obg[i].isDirectory){
            await fsPromises.unlink(path.join(pathProjgect,  obg[i]));
        }
        else{
            deleteFolder(path.join(url, obg[i]));
        }

        await fsPromises.rmdir(url);
    }

}

async function createFolder(){
 let  urlCreatFolder = await fsPromises.mkdir(pathProjgect, { recursive: true });
//   if(!urlCreatFolder){
//     let res = await fsPromises.readdir(pathProjgect);
    
//     res.forEach( async item =>{
    
//       await fsPromises.unlink(path.join(pathProjgect, item))   
//     })

//   }

}

async function bulderHtml(){
  let components = await fsPromises.readdir(pathComponent, { withFileTypes: true });
  let companentsData = {};
  components.forEach(async item =>{
    if(!item.isDirectory()){
        if(path.extname(path.join(pathComponent, item.name)) === '.html'){
            companentsData[item.name.slice(0 , item.name.length - path.extname(path.join(pathComponent, item.name ) ).length)] = await fsPromises.readFile(path.join(pathComponent, item.name), 'utf-8');  
        }
    }
  })
  
  let innerHtml = await fsPromises.readFile(pathTemplate, 'utf-8');
  
  for (const key in companentsData) {
    innerHtml = innerHtml.replace(`{{${key}}}`, companentsData[key]);
  }
  
  await fsPromises.writeFile(path.join(pathProjgect, 'index.html'), innerHtml);
  bulderCss();

}

async function bulderCss(){
 await fsPromises.writeFile(path.join(pathProjgect, 'style.css'),'');

 let styles = await fsPromises.readdir(pathStyles, { withFileTypes: true });

  styles.forEach(async item => {

   if(!item.isDirectory()){

        if(path.extname(path.join(pathStyles, item.name)) === '.css'){

            let readData = await fsPromises.readFile(path.join(pathStyles, item.name));
            await fsPromises.appendFile(path.join(pathProjgect, 'style.css'), readData);
        }
    } 

   })
    
               
}

async function copyFolder(){

  let  urlCreatFolder = await fsPromises.mkdir(path.join(pathProjgect, assets), { recursive: true });
  if(!urlCreatFolder){

    let res = await fsPromises.readdir(path.join(pathProjgect, assets));

    res.forEach( async item =>{
      await fsPromises.unlink(path.join(path.join(pathProjgect, assets), item))   
    })

  }
  



}



 deleteFolder(pathProjgect);
 createFolder();
bulderHtml();





// const promisCreatFolder = fsPromises.mkdir(pathProjgect, { recursive: true });

// promisCreatFolder.then(
//     (url)=>{
//         if(!url){
//             fs.readdir(pathProjgect, (err, res)=>{
//                 res.forEach( item =>{
//                     fs.unlink(pach.join(pathProjgect, item), (err)=>{})   
//                 })   
//               })  
//         }

//         fs.readFile(path.join(__dirname, 'template.html'),'utf-8', (err, data) => {
             
//         })

//     },

//     err=>{

//     }
// )


