#!/usr/bin/env ts-node-script
// A ts-node script to conveniently run a server action.
// For module aliases to work correctly in this script, we had to define "_moduleAliases" in our package.json

import loadEnvForScript from "./env";

loadEnvForScript();
// eslint-disable-next-line import/order
import program from "commander";

const runAction = async (fileName: string, functionCallWithArgs: string) => {
  try {
    const actionModule = await import(`server/actions/${fileName}`);

    const [functionName, args] = functionCallWithArgs.split("(");
    const parsedArgs = args.split(")")[0];

    let result;
    if (parsedArgs) {
      result = await actionModule[functionName](eval(`(${parsedArgs})`));
    } else {
      result = await actionModule[functionName]();
    }

    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

program
  .arguments("<fileName> <functionCallWithArgs>")
  .description(
    "calls the <functionCallWithArgs> function defined in server/actions/<fileName>"
  )
  .action(runAction);

program.parse(process.argv);
