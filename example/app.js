/// <reference path='typings/es6-promise/es6-promise.d.ts' />
var express = require("express");
var uservoice = require("../lib/dist/index");
var config = require("./config");
var app = express();
app.get("/", function (request, response) {
    var client = InitializeClient();
    client.Get("api/v1/forums.json", {
        per_page: 500
    })
        .then(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    response.end();
});
var port = 3000;
app.listen(port, function () {
    console.log("Demo Express server listening on port %d in %s mode", port, app.settings.env);
});
function InitializeClient() {
    return new uservoice.Client({
        SubdomainName: config.Subdomain,
        ApiKey: config.ApiKey,
        ApiSecret: config.ApiSecret
    });
}
exports.App = app;
