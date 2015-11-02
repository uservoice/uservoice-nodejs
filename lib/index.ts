/// <reference path='./typings/oauth/oauth.d.ts' />
/// <reference path='./typings/node/node.d.ts' />
/// <reference path='./typings/es6-promise/es6-promise.d.ts' />

import * as oauth from "oauth";
import {IClientData} from "./src/IClientData";

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
		this.FetchToken();
	}
	
	public Get(endpoint: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.OAuthConsumer.get(`${this.BaseApiUrl}/${endpoint}`, this.OAuthToken, this.OAuthTokenSecret, (error, data, response) => {
				if (error) {
					reject(error);
					return;
				}
				
				resolve(JSON.parse(data));
			});
		});
	}
	
	public Post(endpoint: string, data?: any) {
		return new Promise((resolve, reject) => {
			this.OAuthConsumer.post(`${this.BaseApiUrl}/${endpoint}`, this.OAuthToken, this.OAuthTokenSecret, data, "application/json", (error, data, response) => {
				if (error) {
					reject(error);
					return;
				}
				
				resolve(JSON.parse(data));
			});
		});
	}
	
	public Delete(endpoint: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.OAuthConsumer.delete(`${this.BaseApiUrl}/${endpoint}`, this.OAuthToken, this.OAuthTokenSecret, (error, data, response) => {
				if (error){
					reject(error);
					return;
				}
				
				resolve();
			});
		});
	}
	
	public Put(endpoint: string, data?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.OAuthConsumer.put(`${this.BaseApiUrl}/${endpoint}`, this.OAuthToken, this.OAuthTokenSecret, data, "application/json", (error, data, response) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(JSON.parse(data));
			});
		});
	}
	
	private FetchToken() {
		this.OAuthConsumer.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
			
			if (error) {
				throw new Error("Failed to retrieve request token.");	
				return;
			}
			
			this.OAuthToken = oauthToken;
			this.OAuthTokenSecret = oauthTokenSecret;
		});
	}
	
	private InitializeOAuth() {
		this.OAuthConsumer = new oauth.OAuth(
			`${this.BaseApiUrl}/oauth/request_token`,
			`${this.BaseApiUrl}/oauth/access_token`,
			this.ClientData.ApiKey,
			this.ClientData.ApiSecret,
			'1.0A',
			null,
			'HMAC-SHA1'
		);
	}
}