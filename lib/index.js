/// <reference path='typings/oauth/oauth.d.ts' />
/// <reference path='typings/node/node.d.ts' />
var oauth = require("oauth");
var Client = (function () {
    function Client(ClientData) {
        this.ClientData = ClientData;
        this.ClientData.Protocol = this.ClientData.Protocol || "https";
        this.ClientData.UservoiceDomain = this.ClientData.UservoiceDomain || "uservoice.com";
        this.BaseApiUrl = this.ClientData.Protocol + "://" + this.ClientData.SubdomainName + "." + this.ClientData.UservoiceDomain;
        this.InitializeOAuth();
    }
    Client.prototype.LoginAsOwner = function () {
        this.GetRequestToken();
        // const requestOptions = {
        // 	host: this.BaseApiUrl,
        // 	path: "/api/v1/users/login_as_owner",
        // 	method: "POST"
        // }
        // 
        // const request = http.request(requestOptions, response => {
        // 	console.log(response);
        // });
    };
    ;
    Client.prototype.LoginAsUser = function (email) {
        this.GetRequestToken();
    };
    Client.prototype.GetRequestToken = function () {
        var _this = this;
        this.OAuthConsumer.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
            if (error) {
                throw new Error("Failed to retrieve request token.");
                return;
            }
            _this.OAuthToken = oauthToken;
            _this.OAuthTokenSecret = oauthTokenSecret;
            _this.OAuthConsumer.post(_this.BaseApiUrl + "/api/v1/oauth/authorize.json", _this.OAuthToken, _this.OAuthTokenSecret, null, "application/json", function (err, data, response) {
                console.log(data);
            });
            // this.OAuthConsumer.get(`${this.BaseApiUrl}/api/v1/custom_fields.json`, this.OAuthToken, this.OAuthTokenSecret, (err, data, response) => {
            // 	
            // })
        });
    };
    Client.prototype.InitializeOAuth = function () {
        this.OAuthConsumer = new oauth.OAuth(this.BaseApiUrl + "/oauth/request_token", this.BaseApiUrl + "/oauth/access_token", this.ClientData.ApiKey, this.ClientData.ApiSecret, '1.0', null, 'HMAC-SHA1');
    };
    return Client;
})();
exports.Client = Client;
