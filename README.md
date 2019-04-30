# TandaPay Mobile App


## Description
TandaPay Android mobile application for Policyholders developed as a part of UT Dallas Senior Design. The app is written in React Native and the backend is written in Node using MonngoDB (Mongoose).  


## Backend
To run the backend:
1. Make sure you have [Node.js](https://nodejs.org/en/download/) installed .
2. Replace the IP addresses in every `fetch` statement with the IP address of localhost (using `localhost` instead of the IP address itself will not work).
3. In the root directory of the project, run `npm install` to install all the dependencies.
4. To start the server, run `node server`.


## React Native App
To run the app:
1. Start the server as described above.
2. Install the dependencies, such as Node.js, react-native-cli, Android Studio, etc. Docs describing how to do so are [here](https://facebook.github.io/react-native/docs/getting-started).
3. Change into the `./app/TandaPay` directory and run `npm install` to install app dependencies.
4. Start the Android Emulator.
5. Run `react-native run-android` to start the app.
6. A debugger show automatically open in your browser.


## Additional Details
1. The app assumes that the Secretary has already created a Tanda with emails and access codes in the database. Use these values to get passes the code screen. 







