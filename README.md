# Robot Factory Challenge

Created with [React JS](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/) and [SASS](https://sass-lang.com/) for styling.
Displays list of robots with different statuses and configurations.
Grouped by Factory Second, Passed QA and Ready to Ship.

You can perform actions such as Extinguish, Add to shipment, Remove from Shipment and Send shipment for specific robots.

## Scripts

Once done cloning the project. Checkout `master` branch. Run the following scripts to perform specific specific task:

### `npm install`

Install packages.

### `npm start`

Runs the application in [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run test:jest <file>`

Launches the test runner in the interactive watch mode for specific file.

### `npm run deploy`

Script for deploying the application in [GitHub Pages](https://pages.github.com/).
Access the deployed application [here](https://roijohnkoch.github.io/robot-factory-challenge);

## Other tools/libraries used

Postman: for creating mock-server.

## NOTE

The postman mock-server has a limit of 1000 requests per month, avoid sending too many requests.

## For testing purposes

Since mock-api is used for this application, the response for the APIs are customed to support the following requirements.

### Robot for extinguish

Click `Extinguish` button of `Robot-002`

### Robot Ready to Ship

Click `Add to shipment` button of robots `Robot-004` and `Robot-006`

Click `Send shipment` button in `Ready to Ship` column