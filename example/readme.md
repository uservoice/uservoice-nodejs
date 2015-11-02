npm install
gulp

To run node server:
node app

To watch for TypeScript file changes:
gulp watch

Note: This example project expects a config.js file that looks like this:

export var Subdomain = "mysubdomain"; // e.g. mysubdomain.uservoice.com
export var ApiKey = "xxxx"; // Get from admin portal
export var ApiSecret = "yyyy"; // Get from admin portal

In your own app, you can provide these values however you'd like.