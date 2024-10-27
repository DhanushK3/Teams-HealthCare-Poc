// const restify = require("restify");
// const send = require("send");
// const fs = require("fs");

// //Create HTTP server.
// const server = restify.createServer({
//   key: process.env.SSL_KEY_FILE ? fs.readFileSync(process.env.SSL_KEY_FILE) : undefined,
//   certificate: process.env.SSL_CRT_FILE ? fs.readFileSync(process.env.SSL_CRT_FILE) : undefined,
//   formatters: {
//     "text/html": function (req, res, body) {
//       return body;
//     },
//   },
// });

// server.get(
//   "/static/*",
//   restify.plugins.serveStatic({
//     directory: __dirname,
//   })
// );

// server.listen(process.env.port || process.env.PORT || 3333, function () {
//   console.log(`\n${server.name} listening to ${server.url}`);
// });

// // Adding tabs to our app. This will setup routes to various views
// // Setup home page
// server.get("/", (req, res, next) => {
//   send(req, __dirname + "/views/hello.html").pipe(res);
// });

// // Setup the static tab
// server.get("/tab", (req, res, next) => {
//   send(req, __dirname + "/views/hello.html").pipe(res);
// });
// Initialize Microsoft Teams SDK when the app loads
microsoftTeams.app.initialize()
  .then(() => {
    console.log("Teams app initialized successfully.");
    microsoftTeams.app.appInitialization.notifySuccess();
    setupTab();
  })
  .catch((error) => {
    console.error("Teams app initialization failed: ", error);
  });

// Function to set up the Healthcare tab and display user information
function setupTab() {
  microsoftTeams.app.getContext()
    .then((context) => {
      const userName = context.user?.displayName || "User";
      const appEnvironment = context.app.host.name || "Teams";
      
      // Display a personalized welcome message
      const userGreetingElement = document.getElementById("userGreeting");
      const hubStateElement = document.getElementById("hubState");

      if (userGreetingElement) {
        userGreetingElement.innerText = `Welcome, ${userName}!`;
      }

      if (hubStateElement) {
        hubStateElement.innerText = `You're currently using the CareHealth app in ${appEnvironment}.`;
      }
    })
    .catch((error) => {
      console.error("Error getting Teams context: ", error);
    });
}

// Optional: Authentication (if needed in your app)
microsoftTeams.authentication.getAuthToken({
  successCallback: (token) => {
    console.log("Authentication succeeded. Token: ", token);
  },
  failureCallback: (reason) => {
    console.error("Authentication failed. Reason: ", reason);
  }
});

// Additional functionality for the tab can be added here
