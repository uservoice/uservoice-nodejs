/// <reference path='./typings/oauth/oauth.d.ts' />
/// <reference path='./typings/node/node.d.ts' />
/// <reference path='./typings/es6-promise/es6-promise.d.ts' />
var oauth = require("oauth");
var Client = (function () {
    function Client(ClientData) {
        this.ClientData = ClientData;
        this.ClientData.Protocol = this.ClientData.Protocol || "https";
        this.ClientData.UservoiceDomain = this.ClientData.UservoiceDomain || "uservoice.com";
        this.BaseApiUrl = this.ClientData.Protocol + "://" + this.ClientData.SubdomainName + "." + this.ClientData.UservoiceDomain;
        this.InitializeOAuth();
        this.FetchToken();
    }
    Client.prototype.Get = function (endpoint) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.OAuthConsumer.get(_this.BaseApiUrl + "/" + endpoint, _this.OAuthToken, _this.OAuthTokenSecret, function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(JSON.parse(data));
            });
        });
    };
    Client.prototype.Post = function (endpoint, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.OAuthConsumer.post(_this.BaseApiUrl + "/" + endpoint, _this.OAuthToken, _this.OAuthTokenSecret, data, "application/json", function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(JSON.parse(data));
            });
        });
    };
    Client.prototype.Delete = function (endpoint) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.OAuthConsumer.delete(_this.BaseApiUrl + "/" + endpoint, _this.OAuthToken, _this.OAuthTokenSecret, function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    };
    Client.prototype.Put = function (endpoint, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.OAuthConsumer.put(_this.BaseApiUrl + "/" + endpoint, _this.OAuthToken, _this.OAuthTokenSecret, data, "application/json", function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(JSON.parse(data));
            });
        });
    };
    Client.prototype.FetchToken = function () {
        var _this = this;
        this.OAuthConsumer.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
            if (error) {
                throw new Error("Failed to retrieve request token.");
                return;
            }
            _this.OAuthToken = oauthToken;
            _this.OAuthTokenSecret = oauthTokenSecret;
        });
    };
    Client.prototype.InitializeOAuth = function () {
        this.OAuthConsumer = new oauth.OAuth(this.BaseApiUrl + "/oauth/request_token", this.BaseApiUrl + "/oauth/access_token", this.ClientData.ApiKey, this.ClientData.ApiSecret, '1.0A', null, 'HMAC-SHA1');
    };
    return Client;
})();
exports.Client = Client;
