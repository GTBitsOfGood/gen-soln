# gen-soln

A platform that connects volunteers and donors to non-profits both locally and nationally, and provides the tools that enable non-profits to manage volunteer opportunities and track donations.

# nextjs-starter template

From https://github.com/GTBitsOfGood/nextjs-starter-typescript

# Development

## Setup

- Clone this repository project on your computer.
- Follow the instructions [here](https://www.notion.so/gtbitsofgood/Getting-Started-56106473076a47eaa8c863741becbf34) to install Git, Node.js (v12.X LTS at least) and the MongoDB Community Server.
- Install the Node.js package manager [yarn](https://classic.yarnpkg.com/en/docs/install/).
- Navigate to this project in the terminal and run `yarn install`.
- Run `yarn secrets` to sync project secrets from Bitwarden and save them to `.env.*` files locally. Contact a leadership member for the Bitwarden password.
  - **Note**: If you are using the Windows command prompt, enter `yarn secrets:login` and then `yarn secrets:sync`.
- Start your local MongoDB server by running `mongod` (this command will work if you created aliases as recommended in [this](https://zellwk.com/blog/install-mongodb/) article).
- Next, perform migrations on your local database: `yarn dev:db:migrate up`. You should run this command whenever a new migration is added to the codebase; you can run `yarn dev:db:migrate status` to check if your local database is up to date.
- Run the dev version of this project by entering `yarn dev`.

## Code/PR Workflow

- Assign an issue to yourself and move it to the "In Progress" pipeline. You will have to use ZenHub, either through the [Chrome extension](https://chrome.google.com/webstore/detail/zenhub-for-github/ogcgkffhplmphkaahpmffcafajaocjbd) or through their [web-app](https://app.zenhub.com/), to do this. **Pro-tip**: ZenHub will let you filter issues by labels and milestones. Depending on your sub-team, you may want to filter by the "CORE", "DMS" or "VMS" labels and select the current sprint under milestones.
- Create a new branch in the format `[NAME]/[ISSUE-NUMBER]-[SHORT_DESCRIPTION]` (issue number is optional) by running `git checkout -b [BRANCH NAME]`.
  - example branch name: `daniel/48-setup-ci`
- Be sure to lint, format, and type-check your code occasionally to catch errors by running `yarn lint`. Reach out to an EM if you are having problems with the type-checker or are blocked by anything else in general.
- Commit changes and then push your branch by running `git push -u origin [BRANCH NAME]`.
- Create a pull request (PR) on GitHub to merge your branch into `develop`.
- In your PR, briefly describe the changes, link the PR to its corresponding issue, and request a Senior Developer or EM as a reviewer.

## TypeScript

The `gen-soln` codebase has been primarily written in TypeScript, which is a superset of JavaScript that adds static typing to the language. This means that if you already know how to write JavaScript, you already know how to write TypeScript! Simply rename your `.js` and `.jsx` files to `.ts` and `.tsx`, respectively.

TypeScript will help you catch bugs early at compile-time and save you significant time from manually debugging your code. If your code compiles, you can be very certain that it will work as expected.

To fully utilize the power of TypeScript, you will have to [learn its type system](https://learnxinyminutes.com/docs/typescript/). Use [this](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#section-2-getting-started) as a cheat sheet for using TypeScript with React.

While you are encouraged to use TypeScript, you **don't** have to. Our codebase can be a mix of both TypeScript and JavaScript.

## Migrations

TODO: Add a note about migrations, why we are using them and how to create and run them.

## Storybook

TODO: Add a note about Storybook and how to use it.

# Project Structure

A quick overview of the various folders in this repository:

- [`components/`](components): Contains _almost all_ of our front-end code. This is where we put our React components, custom hooks, reducers, etc. It has four sub-folders:
  - [`auth/`](components/auth): Code that is specific to authentication (login page, sign-up, etc.)
  - [`core/`](components/core): Will contain components that make up the Horizon Design System, implemented using [Material-UI](https://material-ui.com).
  - [`donation/`](components/donation): Code that is specific to the donation management solution.
  - [`events/`](components/events): Will contain code that is specific to the volunteer management solution.
  - Any components or hooks that are **not** part of the Horizon Design System but are still **shared** across different parts of the application can be put as root files in this folder.
- [`pages/`](pages): Self-explanatory, see Next.js' [docs](https://nextjs.org/docs/basic-features/pages).
- [`public/`](public): Stores static files like images, see Next.js' [docs](https://nextjs.org/docs/basic-features/static-file-serving).
- [`requests/`](requests): Contains several files, one for each entity/model in our application. We define code for fetching data on the client-side here.
- [`server/`](server): Contains _almost all_ of our back-end code. This is where we put our Mongoose models, business logic code, and database migration scripts. It has three sub-folders:
  - [`actions/`](server/actions): This folder also contains one file for each entity/model. Each file contains methods that describe various "actions" associated with that entity, often described through Mongoose queries. Actions can be exposed to the client by creating a corresponding API endpoint. **Pro-tip:** If you want to run an action from the terminal, see this: https://github.com/GTBitsOfGood/gen-soln/pull/142#issue-486765182.
  - [`migrations/`](server/migrations): Contains database migration scripts. Read more about migrations [here](https://dev.to/pesse/one-does-not-simply-update-a-database--migration-based-database-development-527d).
  - [`models/`](server/models): Each file in this folder defines an entity (through Mongoose schemas) in our application and creates the corresponding Mongoose model.
- [`utils/`](utils): A folder that contains miscellaneous code used throughout our application. If you find yourself writing code that is used across the various root folders, put it in a file in `utils/`.
- [`config.ts`](config.ts): Not a folder, but a very important file that exports an object used throughout our application. You can think of this file as the single source of ground-truth. You want to use the database URL? `import config from "config"`. You want to know which API endpoints and page routes are available? `import config from "config"`.
