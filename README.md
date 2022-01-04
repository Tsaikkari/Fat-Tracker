# Fat-Tracker App

This is an app that will track the fat that you're going to lose on a weekly basis. Your progress is displayed in a chart so that you can enjoy your success or improve your procedures.

Dependencies:

- node >= 14
- mongod 4.x

```sh
$ npm install
```

## RUN

```sh
$ npm start
```

### Delete git after cloning the repo in the root folder of the project

```bash
$ rm -rf .git
```

### Change the name of the database in db/index.js

```js
// db/index.js

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/< name of the db>'
```

### Create an application in the google developers console and set the appropriate frontend urls

- Include oauth env variables in your .env file

### Create a Mailgun account and include env variables in your .env file

- Mailgun free tier: You can only send to Authorized Recipients that you need to enter inside your account manually; there is a maximum of 5 Authorized Recipients.

- If you want to create a user without the email verification, use the google login option. Install react-google-login for your frontend application to send the token to the server for verification.
