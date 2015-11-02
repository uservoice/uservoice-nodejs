/// <reference path='typings/oauth/oauth.d.ts' />
/// <reference path='typings/node/node.d.ts' />

import oauth = require("oauth");
import http = require("http");

export class Client {
	private OAuthConsumer: oauth.OAuth;
	private OAuthToken: string;
	private OAuthTokenSecret: string;
	private BaseApiUrl: string;
	
	constructor(private ClientData: IClientData) {
		this.ClientData.Protocol = this.ClientData.Protocol || "https";
		this.ClientData.UservoiceDomain = this.ClientData.UservoiceDomain || "uservoice.com";
		this.BaseApiUrl = `${this.ClientData.Protocol}://${this.ClientData.SubdomainName}.${this.ClientData.UservoiceDomain}`;
		
		this.InitializeOAuth();
	}
	
	public LoginAsOwner() {
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
	
	public LoginAsUser(email: string) {
		this.GetRequestToken();
	}
	
	private GetRequestToken() {
		this.OAuthConsumer.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
			
			if (error) {
				throw new Error("Failed to retrieve request token.");	
				return;
			}
			
			this.OAuthToken = oauthToken;
			this.OAuthTokenSecret = oauthTokenSecret;
			
			this.OAuthConsumer.post(`${this.BaseApiUrl}/api/v1/oauth/authorize.json`, this.OAuthToken, this.OAuthTokenSecret, null, "application/json", (err, data, response) => {
				console.log(data);
			})
			
			// this.OAuthConsumer.get(`${this.BaseApiUrl}/api/v1/custom_fields.json`, this.OAuthToken, this.OAuthTokenSecret, (err, data, response) => {
			// 	
			// })
		});
	}
	
	private InitializeOAuth() {
		this.OAuthConsumer = new oauth.OAuth(
			`${this.BaseApiUrl}/oauth/request_token`,
			`${this.BaseApiUrl}/oauth/access_token`,
			this.ClientData.ApiKey,
			this.ClientData.ApiSecret,
			'1.0',
			null,
			'HMAC-SHA1'
		);
	}
}

export interface IClientData {
	SubdomainName: string;
	ApiKey: string;
	ApiSecret?: string;
	CallBack?: string; // wtf is this
	Token?: string;
	Secret?: string;
	UservoiceDomain?: string;
	Protocol?: string;
}

interface AuthorizationData {
	oauth_signiture_method: string;
	oauth_signature: string;
	oauth_timestamp: string;
	oauth_nonce: string;
	oauth_version: string;
	oauth_consumer_key: string;
	request_token: string;
}