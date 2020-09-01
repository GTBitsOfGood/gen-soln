# gen-soln
Centralized platform designed to provide nonprofits with the opportunity to sell their merchandise in an online marketplace and receive donations from their sponsors.

# nextjs-starter template
From https://github.com/GTBitsOfGood/nextjs-starter-typescript

# Development
## Setup
- Clone this repository project on your computer.
- Install the node.js package manager [yarn](https://classic.yarnpkg.com/en/docs/install/).
- Navigate to this project in terminal and run `yarn install`.
- Setup bitwarden for syncing secrets and sync the secrets into a .env file by running `yarn secrets`. Contact a leadership member for the bitwarden password.
- Run the dev version of this project by entering `yarn dev`.

## Code/PR Workflow
- Create a new branch in the format `[NAME]/[ISSUE-NUMBER]-[SHORT_DESCRIPTION]` (issue number is optional) by running `git checkout -b [BRANCH NAME]`
  - example branch name: `daniel/48-setup-ci`
- Commit changes and push your branch by running `git push -u origin [BRANCH NAME]`
- Create a pull request (PR) on GitHub to merge your branch into develop.
- In your PR, briefly describe the changes, link the PR to its corresponding issue, and request a Senior Developer or EM as a reviewer.