/// <reference path="typings/oauth/oauth.d.ts" />
/// <reference path="typings/node/node.d.ts" />
export declare class Client {
    private ClientData;
    private OAuthConsumer;
    private OAuthToken;
    private OAuthTokenSecret;
    private BaseApiUrl;
    constructor(ClientData: IClientData);
    LoginAsOwner(): void;
    LoginAsUser(email: string): void;
    private GetRequestToken();
    private InitializeOAuth();
}
export interface IClientData {
    SubdomainName: string;
    ApiKey: string;
    ApiSecret?: string;
    CallBack?: string;
    Token?: string;
    Secret?: string;
    UservoiceDomain?: string;
    Protocol?: string;
}
