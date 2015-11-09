


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
    Client.prototype.Get = function (endpoint, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.BaseApiUrl + "/" + endpoint + "?" + (data ? Object.keys(data).map(function (key) { return (key + "=" + data[key] + "&"); }).join("") : "");
            _this.OAuthConsumer.get(url, _this.OAuthToken, _this.OAuthTokenSecret, function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(_this.ParseData(data));
            });
        });
    };
    Client.prototype.Post = function (endpoint, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.OAuthConsumer.post(_this.BaseApiUrl + "/" + endpoint, _this.OAuthToken, _this.OAuthTokenSecret, data ? JSON.stringify(data) : null, "application/json", function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(_this.ParseData(data));
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
            _this.OAuthConsumer.put(_this.BaseApiUrl + "/" + endpoint, _this.OAuthToken, _this.OAuthTokenSecret, data ? JSON.stringify(data) : null, "application/json", function (error, data, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(_this.ParseData(data));
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
    Client.prototype.ParseData = function (data) {
        try {
            return JSON.parse(data);
        }
        catch (err) {
            return data;
        }
    };
    return Client;
})();
exports.Client = Client;
