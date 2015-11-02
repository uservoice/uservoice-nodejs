declare module "oauth" {
	export class OAuth {
		constructor(requestTokenUrl: string, accessTokenUrl: string, applicationConsumerKey: string, applicationSecret: string, oauthVersion: string, something: any, encryption: string);
		get(url: string, userToken: string, userSecret: string, callback: (error, data, response) => any): OAuth;
		post(url, oauth_token, oauth_token_secret, post_body, post_content_type, callback): OAuth;
		getOAuthRequestToken(callback: (error: any, oauth_token: string, oauth_token_secret: string, results) => void): void;
		_getNonce: (size: number) => number;	
	}
}