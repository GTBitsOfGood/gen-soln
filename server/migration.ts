#!/usr/bin/env ts-node-script
// A ts-node script to manage our MongoDB migrations.
// For module aliases to work correctly in this script, we had to define "_moduleAliases" in our package.json
// eslint-disable-next-line import/order
import loadEnvForScript from "./env";

loadEnvForScript();
// Code based on https://github.com/seppevs/migrate-mongo/blob/master/bin/migrate-mongo.js
import Table from "cli-table3";
import program from "commander";
import lodash from "lodash";
import {
  create,
  up,
  down,
  status,
  config as mongoConfig,
  database
} from "migrate-mongo";

import config from "config";

type MIGRATION_DIRECTION = "UP" | "DOWN";

function handleError(err: Error) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}

const migrationConfig = {
  // We ensure that our Mongoose connection and migration config use the same DB:
  mongodb: {
    url: config.db.url,
    databaseName: config.db.name,
    options: config.db.options
  },
  migrationsDir: "server/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".ts"
};

// @ts-ignore: We are using migrate-mongo v8 but types have been written for v7
mongoConfig.set(migrationConfig);

async function createMigrationFile(description: string) {
  try {
    const fileName = await create(description);
    console.log(`Created: migrations/${fileName}`);
  } catch (error) {
    handleError(error);
  }
}

async function migrate(direction: MIGRATION_DIRECTION, nDown = 1) {
  try {
    const { db } = await database.connect();

    let migrated = [];
    switch (direction) {
      case "UP":
        migrated = await up(db);
        break;
      case "DOWN":
        while (nDown) {
          migrated.push(...(await down(db)));
          nDown--;
        }
        break;
      default: {
        const _exhaustiveCheck: never = direction;
        return _exhaustiveCheck;
      }
    }

    migrated.forEach(migratedItem => {
      console.log(`MIGRATED ${direction}: ${migratedItem}`);
    });

    process.exit(0);
  } catch (error) {
    handleError(error);
  }
}

async function getMigrationStatus() {
  try {
    const { db } = await database.connect();

    const statusItems = await status(db);
    const table = new Table({ head: ["Filename", "Applied At"] });
    statusItems.forEach(item => table.push(lodash.values(item)));
    console.log(table.toString());
    process.exit(0);
  } catch (error) {
    handleError(error);
  }
}

program
  .command("create [description]")
  .description("create a new database migration with the provided description")
  .action(createMigrationFile);

program
  .command("up")
  .description("run all pending database migrations")
  .action(() => void migrate("UP"));

program
  .command("down [times]")
  .description(
    "undo the last applied database migration; supports an integer 'times' argument to repeatdely call 'down'"
  )
  .action((times = "1") => void migrate("DOWN", Number(times)));

program
  .command("status")
  .description("print the change-log of the database")
  .action(getMigrationStatus);

program.parse(process.argv);
