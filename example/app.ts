/// <reference path='typings/es6-promise/es6-promise.d.ts' />

import express = require("express");
import uservoice = require("../lib/dist/index");
import config = require("./config");

var app: any = express();

app.get("/", (request, response) => {
	var client = this.InitializeClient();
	client.Get(`api/v1/forums/${"269223"}/suggestions.json?per_page=500`)
		.then(data => {
			console.log(data);
		}, error => console.log(error));
	
	response.end();
});

var port = 3000;
app.listen(port, function() {
    console.log("Demo Express server listening on port %d in %s mode", port, app.settings.env);
});

function InitializeClient(): uservoice.Client {
	return new uservoice.Client({
		SubdomainName: config.Subdomain,
		ApiKey: config.ApiKey,
		ApiSecret: config.ApiSecret
	});
}

export var App = app;