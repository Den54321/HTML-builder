const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const pathProjgect = path.join(__dirname, 'project-dist');
const pathComponent = path.join(__dirname, 'components');
const pathTemplate = path.join(__dirname, 'template.html');
const pathStyles = path.join(__dirname, 'styles');
const pachAssets = path.join(__dirname, 'assets');

async function deleteFolder(url){
try{

    let  obg = await fsPromises.readdir(url, { withFileTypes: true })
    if(obg.length !== 0){
        for(let i = 0; i < obg.length; i++)
      {
          if(!obg[i].isDirectory()){
            await fsPromises.unlink(path.join(url,  obg[i].name));
          }

          else{
            await deleteFolder(path.join(url, obg[i].name));
          }   
      }
    }
     await fsPromises.rmdir(url);
  }

  catch(error){
     

  }
}

async function createFolder(){ 
 
 try{
  let  urlCreatFolder = await fsPromises.mkdir(pathProjgect, { recursive: true });
 }
 catch{

 }
 

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

async function copyFolder(pathCopy, pathInsert){
   try{
    let  obg = await fsPromises.readdir(pathCopy, { withFileTypes: true });
    for(let i = 0; i < obg.length; i++)
    {
        if(!obg[i].isDirectory()){
          let data = await fsPromises.readFile( path.join(pathCopy, obg[i].name));
          await fsPromises.writeFile(path.join(pathInsert, obg[i].name), data);
        }

        else{
          await fsPromises.mkdir(path.join(pathInsert, obg[i].name), { recursive: true });
          copyFolder(path.join(pathCopy, obg[i].name), path.join(pathInsert, obg[i].name));
        }   
    }
   }

   catch(error){
      console.log('error')
   }
 
}


 (async ()=>{
    await deleteFolder(pathProjgect);
    await createFolder(); 
    await bulderHtml();
    await bulderCss();
    copyFolder(pachAssets ,  path.join(pathProjgect, 'assets' ));
 })();










