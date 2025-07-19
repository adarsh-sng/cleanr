import * as fs from "node:fs/promises";
import path from "node:path";
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

export const getExtensiontoDelete=(userInputs)=>{
    const toDeleteExt = [];
    for (let i = 2; i < userInputs; i++) {
    let ext = process.argv[i];
    if (ext[0] != ".") ext = "." + ext;
    toDeleteExt.push(ext);}
    return toDeleteExt;
}

export const fileToDelete= async(currentDir,toDeleteExt)=>{
    const toDelete = [];
    const files = await fs.readdir(currentDir);
    for (const file of files) {
      const extension = path.parse(file).ext;
      //   console.log(extension);
      if (toDeleteExt.includes(extension)) {
        toDelete.push(file);}
    }
    return toDelete;
}
export const deleteFile = async(toDelete) => {
    for (const file of toDelete) {
        try {
            await fs.unlink(file);
            console.log(`successfully deleted ${file}`);
        } catch (error) {
            console.error(`there was an error deleting ${file}:`, error.message);
        }
    }
}