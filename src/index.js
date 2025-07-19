#!/usr/bin/env node
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";
import { deleteFile, fileToDelete, getExtensiontoDelete } from "../utils/deleteFiles.js";
import { getDeletionPermission } from "../utils/deletePrompt.js";

const currentDir = process.cwd();

console.log(chalk.greenBright("Command executed from:", currentDir));

const userInputs = process.argv.length;

process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
  } else {
    throw error;
  }
});

if (userInputs > 2) {
  try {
    const toDeleteExt = getExtensiontoDelete(userInputs)
    const toDelete = await fileToDelete(currentDir,toDeleteExt)
    console.log(chalk.green(`\nFiles to delete:\n  - ${toDelete.join("\n  - ")}\n`));
    const answer = await getDeletionPermission()
    if(answer=='y'){
      deleteFile(toDelete)
    } else {
      console.log("Deletion Cancelled")
    }
  } catch(err) {
    console.error(err);
  }
} else {
  console.log("please give the file to be deleted.");
}
