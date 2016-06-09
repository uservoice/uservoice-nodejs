import * as q from 'q';
import * as querystring from 'querystring';
import {TicketService} from './api/services/ticketService';
import {TicketMessageService} from './api/services/ticketMessageService';
import {TicketNoteService} from './api/services/ticketNoteService';
import {AssetService} from './api/services/assetService';
import {IOAuthProvider, IOAuthConsumer, OAuthProvider} from './oauthProvider';
import {IRequestOptions} from './api/models/model';
import {DateParser} from '../dateParser';

export class Client {
  public consumer: IOAuthConsumer;
  public requestOptions: IRequestOptions;
  public ticketService = new TicketService(this);
  public ticketMessageService = new TicketMessageService(this);
  public ticketNoteService = new TicketNoteService(this);
  public ticketAssetService = new AssetService(this);
  private baseUrl: string;

  constructor(private clientOptions: IClientOptions, private oAuthProviderInstance: IOAuthProvider = new OAuthProvider()) {
    this.baseUrl = `https://${clientOptions.subdomain}.${clientOptions.domain || 'uservoice.com'}/api/v1/`;
    this.requestOptions = this.mergeOptions(clientOptions.options);
    this.consumer = oAuthProviderInstance.getConsumer(this.baseUrl, clientOptions.apiKey, clientOptions.apiSecret);
  }

  /**
   * Authenticates this instance as a specific user
   * @todo loginAs is incomplete
   */
  public loginAs(email: string) {
    return this.getRequestToken()
      .then(client => this.post<ILoginAsResponse>('users/login_as.json', {
        request_token: client.getAccessToken(),
        user: { email: email }
      }))
      .then(response => this.loginWithAccessToken(response.token.oauth_token, response.token.oauth_token_secret));
  }

  /**
   * Authenticates as owner
   */
  public loginAsOwner() {
    return this.getRequestToken()
      .then(client => this.post<ILoginAsResponse>('users/login_as_owner.json', { request_token: client.getAccessToken() })
        .then(response => this.loginWithAccessToken(response.token.oauth_token, response.token.oauth_token_secret)));
  }

  public get<T>(endpoint: string, data: any = {}) {
    DateParser.processDates(data);

    const defer = q.defer<T>();

    let url = this.baseUrl + endpoint;
    if (data) {
      url = `${url}?${querystring.stringify(data)}`;
    }

    this.consumer.get(url, this.getAccessToken(), this.getAccessSecret(),
      (error, response) => this.resolveConsumerResponse(error, response, defer));

    return defer.promise;
  }

  public post<T>(endpoint: string, data: any = {}) {
    DateParser.processDates(data);

    const defer = q.defer<T>();

    this.consumer.post(this.baseUrl + endpoint, this.getAccessToken(), this.getAccessSecret(), JSON.stringify(data), 'application/json',
      (error: any, response: any) => this.resolveConsumerResponse(error, response, defer));

    return defer.promise;
  }

  public put<T>(endpoint: string, data: any = {}) {
    DateParser.processDates(data);

    const defer = q.defer<T>();

    this.consumer.put(this.baseUrl + endpoint, this.getAccessToken(), this.getAccessSecret(), JSON.stringify(data), 'application/json',
      (error: any, response: any) => this.resolveConsumerResponse(error, response, defer));

    return defer.promise;
  }

  public delete<T>(endpoint: string) {
    const defer = q.defer<T>();

    this.consumer.delete(this.baseUrl + endpoint, this.getAccessToken(), this.getAccessSecret(),
      (error, data) => this.resolveConsumerResponse(error, data, defer));

    return defer.promise;
  }

  public getAccessToken() { return this.clientOptions ? this.clientOptions.accessToken : ''; }
  public getBaseUrl() { return this.baseUrl; }

  private loginWithAccessToken(token: string, secret: string) {
    const clonedOptions = this.clone(this.clientOptions);
    clonedOptions.accessToken = token;
    clonedOptions.accessSecret = secret;

    return new Client(clonedOptions, this.oAuthProviderInstance);
  }

  private getRequestToken() {
    const defer = q.defer<Client>();

    this.consumer.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {

      if (error) {
        defer.reject(error);
        return;
      }


      const parsedResults = JSON.parse(Object.keys(results)[0]);
      const token = parsedResults.token;
      defer.resolve(this.loginWithAccessToken(token.oauth_token, token.oauth_token_secret));
    });

    return defer.promise;
  }

  /**
   * Merges user provided options with defaults
   */
  private mergeOptions(options: IRequestOptions = {}) {
    options.pagination = options.pagination || {};
    options.pagination.max = options.pagination.max || 500;
    return options;
  }

  private resolveConsumerResponse(error: any, data: any, defer: Q.Deferred<any>) {
    if (error) {
      defer.reject(error);
      return;
    }

    defer.resolve(this.parse(data));
  }

  private parse(data: any) {
    let parsedData: any;

    try {
      parsedData = JSON.parse(data);
    } catch (err) {
      parsedData = data;
    }

    return DateParser.processDateStrings(parsedData);
  }

  private clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  private getAccessSecret() { return this.clientOptions ? this.clientOptions.accessSecret : ''; }
}

interface ILoginAsResponse {
  token: {
    oauth_token: string;
    oauth_token_secret: string;
  };
}

export interface IClientOptions {
  subdomain: string;
  apiKey: string;
  apiSecret: string;
  domain?: string;
  options?: IRequestOptions;
  accessToken?: string;
  accessSecret?: string;
}
