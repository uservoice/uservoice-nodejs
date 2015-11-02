/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/express/express.d.ts' />
var express = require("express");
var uservoice = require("../lib/index");
var config = require("./config");
var app = express();
app.get("/", function (request, response) {
    var client = new uservoice.Client({
        SubdomainName: config.Subdomain,
        ApiKey: config.ApiKey,
        ApiSecret: config.ApiSecret
    });
    client.Get("api/v1/users.json")
        .then(function (data) {
        console.log(data);
    }, function (error) { return console.log(error); });
    response.end();
});
app.listen(3000, function () {
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});
exports.App = app;
