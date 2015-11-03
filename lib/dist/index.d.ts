


import { IClientData } from "./IClientData";
export declare class Client {
    private ClientData;
    private BaseApiUrl;
    private OAuthConsumer;
    private OAuthToken;
    private OAuthTokenSecret;
    constructor(ClientData: IClientData);
    Get(endpoint: string, data?: any): Promise<any>;
    Post(endpoint: string, data?: any): Promise<{}>;
    Delete(endpoint: string): Promise<any>;
    Put(endpoint: string, data?: any): Promise<any>;
    private FetchToken();
    private InitializeOAuth();
    private ParseData(data);
}
