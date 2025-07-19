import { select, Separator } from "@inquirer/prompts";

export const getDeletionPermission =async()=>{
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
    ],
    default:"n",
  });
  return answer;
}



 