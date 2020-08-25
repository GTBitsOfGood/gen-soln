# gen-soln
Centralized platform designed to provide nonprofits with the opportunity to sell their merchandise in an online marketplace and receive donations from their sponsors.

# nextjs-starter template
From https://github.com/GTBitsOfGood/nextjs-starter-typescript

## Setup
### Development
- Fork this repository to your account.
- Clone the forked repository project to your computer.
- Install the node.js package manager [yarn](https://classic.yarnpkg.com/en/docs/install/).
- Navigate to this project in terminal and run `yarn install`.
- Setup bitwarden for syncing secrets by running `yarn secrets`. Contact a leadership member for the bitwarden password.
- Sync the secrets into a .env file by running `yarn secrets-sync`.
- Run the dev version of this project by entering `yarn dev`.
### Syncing Forked Repository
- Add the gen-soln repository as a remote by running `git remote add upstream https://github.com/GTBitsOfGood/gen-soln.git`
- Fetch changes to gen-soln repository with `git fetch upstream` and run `git merge upstream/develop develop` to merge changes to the develop branch of your personal repository.