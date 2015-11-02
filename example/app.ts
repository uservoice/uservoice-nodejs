/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/express/express.d.ts' />

import express = require("express");
import uservoice = require("../lib/index");
import config = require("./config");

var app: any = express();
app.get("/", (request, response) => {
	
	var client = new uservoice.Client({
		SubdomainName: config.Subdomain,
		ApiKey: config.ApiKey,
		ApiSecret: config.ApiSecret
	});
	
	client.Get(`api/v1/forums/${"269223"}/suggestions.json?per_page=500`)
		.then(data => {
			console.log(data);
		}, error => console.log(error));
	
	response.end();
});

app.listen(3000, function() {
    console.log("Demo Express server listening on port %d in %s mode", 3001, app.settings.env);
});

export var App = app;