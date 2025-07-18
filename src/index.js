#!/usr/bin/env node
import * as fs from "node:fs/promises";
import path from "node:path";
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

const currentDir = process.cwd();

console.log(chalk.red("Command executed from:", currentDir));
// console.log(process.argv);

const userInputs = process.argv.length;

process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
  } else {
    // Rethrow unknown errors
    throw error;
  }
});

if (userInputs > 2) {
  const toDeleteExt = [];
  const toDelete = [];
  for (let i = 2; i < userInputs; i++) {
    let ext = process.argv[i];
    if (ext[0] != ".") ext = "." + ext;
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

  console.log(chalk.green(`\nFiles to delete:\n  - ${toDelete.join("\n  - ")}\n`));

  const answer = await select({
    message: "select files to delete or not",
    choices: [
      {
        name: "y",
        value: "y",
        description: "y to delete",
      },
     {
        name: "n",
        value: "n",
        description: "n to not delete",
      },
  
      new Separator(),
    ],
    default:"n",
  });
  try{
  if(answer=='y'){
     for (const file of toDelete) {
    try {
      await fs.unlink(file);
      console.log(`successfully deleted ${file}`);
    } catch (error) {
      console.error(`there was an error deleting ${file}:`, error.message);
    }
  }
  }else{
    console.log("Deletion Cancelled")
  }}catch(err){
     console.error(err);
};
} else {
  console.log("please give the file to be deleted.");
}
