/// <reference path="typings/oauth/oauth.d.ts" />
/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/es6-promise/es6-promise.d.ts" />
import { IClientData } from "./src/IClientData";
export declare class Client {
    private ClientData;
    private OAuthConsumer;
    private OAuthToken;
    private OAuthTokenSecret;
    private BaseApiUrl;
    constructor(ClientData: IClientData);
    Get(endpoint: string): Promise<any>;
    Post(endpoint: string, data?: any): Promise<{}>;
    Delete(endpoint: string): Promise<any>;
    Put(endpoint: string, data?: any): Promise<any>;
    private FetchToken();
    private InitializeOAuth();
}
