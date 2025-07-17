#!/usr/bin/env node
import * as fs from 'node:fs/promises';
import path from 'node:path';

const currentDir = process.cwd();

console.log("Command executed from:", currentDir);
// console.log(process.argv);

const userInputs = process.argv.length;

if (userInputs > 2) {
  const toDeleteExt = [];
  const toDelete = [];
  for (let i = 2; i < userInputs; i++) {
    let ext = process.argv[i];
    if(ext[0]!='.') ext ='.'+ext;
    toDeleteExt.push(ext);
  }
  try {
    const files = await fs.readdir(currentDir);
    for (const file of files) {
      const extension = path.parse(file).ext;
    //   console.log(extension);
      if (toDeleteExt.includes(extension)) {
        toDelete.push(file);
      }
    }
  } catch (err) {
    console.error(err);
  }
 
 console.log(`\nFiles to delete:\n  - ${toDelete.join('\n  - ')}\n`);

// for (const file of toDelete) {
//   try {
//     await fs.unlink(file);
//     console.log(`successfully deleted ${file}`);
//   } catch (error) {
//     console.error(`there was an error deleting ${file}:`, error.message);
//   }
// }
}
else{
    console.log("please give the file to be deleted.")
}



