import {IOAuthProvider, IOAuthConsumer} from '../src/v1/oauthProvider';

export class FakeOAuthProvider implements IOAuthProvider {
  constructor(private options: IResponseOptions = {}) { }

  public getConsumer(baseUrl: string, apiKey: string, apiSecret: string) {
    return new FakeOAuthConsumer(this.options);
  }
}

export class FakeOAuthConsumer implements IOAuthConsumer {
  constructor(private options: IResponseOptions) { }

  public get(url: string, userToken: string, userSecret: string, callback: (error: any, data: any, response: any) => any) {
    const getResponse = this.options.get;
    if (!getResponse) { return this; }

    callback(getResponse.error, getResponse.data, getResponse.response);
    return this;
  }

  public delete(url: string, userToken: string, userSecret: string, callback: (error: any, data: any, response: any) => any) {
    const deleteResponse = this.options.delete;
    if (!deleteResponse) { return this; }

    callback(deleteResponse.error, deleteResponse.data, deleteResponse.response);
    return this;
  }

  public post(url: string, oauthToken: string, oauthTokenSecret: string, postBody: any, postContentType: string, callback: (error: any, data: any, response: any) => any) {
    const postResponse = this.options.post;
    if (!postResponse) { return this; }

    callback(postResponse.error, postResponse.data, postResponse.response);
    return this;
  }

  public put(url: string, oauthToken: string, oauthTokenSecret: string, postBody: any, postContentType: string, callback: (error: any, data: any, response: any) => any) {
    const putResponse = this.options.put;
    if (!putResponse) { return this; }

    callback(putResponse.error, putResponse.data, putResponse.response);
    return this;
  }

  public getOAuthRequestToken(callback: (error: any, oauthToken: string, oauthTokenSecret: string, results: any) => void) {
    callback(null, 'test-token', 'test-secret', null);
  }
}

export interface IResponseOptions {
  post?: IResponse;
  get?: IResponse;
  delete?: IResponse;
  put?: IResponse;
}

export interface IResponse {
  data?: any;
  error?: any;
  response?: any;
}
