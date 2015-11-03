# UserVoice Node.js SDK

UserVoice SDK is now packaged in a npm library to be used from Node.js services.

# Install Uservoice Library from NPM

<pre>npm install uservoice-nodejs --save</pre>

# Usage

<pre>
<code>var express = require("express");
var uservoice = require("uservoice-nodejs");
var config = require("./config");

var app = express();

app.get("/", (request, response) => {

    // Initialize UserVoice API Client
	var client = new uservoice.Client({
		SubdomainName: config.Subdomain,
		ApiKey: config.ApiKey,
		ApiSecret: config.ApiSecret
	});;
	
    // Get the first 500 forums
	client.Get(`api/v1/forums.json`, {
		per_page: 500
	})
	.then(
		data => console.log(data),
		error => console.log(error)
	);
	
    // Make a new ticket
	client.Post(`api/v1/tickets.json`, {
		email: "test@test123.com",
		name: "api test",
		ticket: {
			state: "open",
			subject: "testing api",
			message: "this is a message" 
		}
	})
	.then(
		data => console.log(data),
		error => console.log(error)
	);
	
	response.end();
});
</code>
</pre>