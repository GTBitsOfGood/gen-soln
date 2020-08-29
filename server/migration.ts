#!/usr/bin/env ts-node-script
// A ts-node script to manage our MongoDB migrations.
// Ensure that the code here can be executed by running "ts-node -O '{\"module\": \"commonjs\"}' -r module-alias/register".
// For module aliases to work correctly in this script, we had to define "_moduleAliases" in our package.json

import dotenv from "dotenv";

// Add all ".env.*" files here. Order matters, ".env.*" file with higher precedence should appear first.
const envFiles = [".env.local", ".env.development.local", ".env.development"];
envFiles.forEach(envFile => void dotenv.config({ path: `${envFile}` }));

// Code based on https://github.com/seppevs/migrate-mongo/blob/master/bin/migrate-mongo.js
import { create, up, down, status, config, database } from "migrate-mongo";
import program from "commander";
import Table from "cli-table3";
import lodash from "lodash";

import appConfig from "config";

type MIGRATION_DIRECTION = "UP" | "DOWN";

function handleError(err: Error) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}

const migrationConfig = {
  // We ensure that our Mongoose connection and migration config use the same DB:
  mongodb: {
    url: appConfig.dbUrl,
    databaseName: appConfig.dbName,
    options: appConfig.dbOptions
  },
  migrationsDir: "server/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".ts"
};

// @ts-ignore: We are using migrate-mongo v8 but types have been written for v7
config.set(migrationConfig);

async function createMigrationFile(description: string) {
  try {
    const fileName = await create(description);
    console.log(`Created: migrations/${fileName}`);
  } catch (error) {
    handleError(error);
  }
}

async function migrate(direction: MIGRATION_DIRECTION) {
  try {
    const { db } = await database.connect();

    let migrated;
    switch (direction) {
      case "UP":
        migrated = await up(db);
        break;
      case "DOWN":
        migrated = await down(db);
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
  .command("down")
  .description("undo the last applied database migration")
  .action(() => void migrate("DOWN"));

program
  .command("status")
  .description("print the change-log of the database")
  .action(getMigrationStatus);

program.parse(process.argv);
