import * as oauth from 'node-oauth';

export class OAuthProvider implements IOAuthProvider {
  public getConsumer(baseUrl: string, apiKey: string, apiSecret: string): IOAuthConsumer {
    return new oauth.OAuth(
      `${baseUrl}oauth/request_token.json`,
      `${baseUrl}oauth/access_token.json`,
      apiKey,
      apiSecret,
      '1.0A',
      null,
      'HMAC-SHA1'
    );
  }
}

export interface IOAuthProvider {
  getConsumer(baseUrl: string, apiKey: string, apiSecret: string): IOAuthConsumer;
}

export interface IOAuthConsumer {
  get(url: string, userToken: string, userSecret: string, callback: (error: any, data: any, response: any) => any): IOAuthConsumer;
  delete(url: string, userToken: string, userSecret: string, callback: (error: any, data: any, response: any) => any): IOAuthConsumer;
  post(url: string, oauthToken: string, oauthTokenSecret: string, postBody: any, postContentType: string, callback: any): IOAuthConsumer;
  put(url: string, oauthToken: string, oauthTokenSecret: string, postBody: any, postContentType: string, callback: any): IOAuthConsumer;
  getOAuthRequestToken(callback: (error: any, oauthToken: string, oauthTokenSecret: string, results: any) => void): void;
}
