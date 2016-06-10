import * as Promise from 'bluebird';
import * as request from 'request';
import * as querystring from 'querystring';
import {DateParser} from '../dateParser';
import {ForumService} from './api/services/forumService';
import {NpsRatingService} from './api/services/npsRatingService';

export class ClientV2 implements IClientV2 {
  public forumService = new ForumService(this);
  public npsRatingService = new NpsRatingService(this);
  private baseUrl: string;
  private accessToken: string;

  constructor(private options: IClientV2Options) {
    this.baseUrl = `https://${options.subdomain}.${options.domain || 'uservoice.com'}/api/v2/`;
  }

  public loginAsOwner(clientSecret: string) {
    return this.loginWithBody(`client_id=${this.options.clientId};client_secret=${clientSecret};grant_type=client_credentials;`);
  }

  public loginAsUser(email: string, password: string) {
    return this.loginWithBody(`client_id=${this.options.clientId};username=${email};password=${password};grant_type=password;`);
  }

  public get<T>(endpoint: string, data: any = {}) {
    DateParser.processDates(data);

    if (data) {
      endpoint = `${endpoint}?${querystring.stringify(data)}`;
    }

    return this.executeRequest<T>('GET', endpoint);
  }

  public post<T>(endpoint: string, data: any = {}) {
    return this.executeRequest<T>('POST', endpoint, data);
  }

  public put<T>(endpoint: string, data: any = {}) {
    return this.executeRequest<T>('PUT', endpoint, data);
  }

  public delete<T>(endpoint: string) {
    return this.executeRequest<T>('PUT', endpoint);
  }

  private executeRequest<T>(method: string, endpoint: string, data?: any) {
    const options: request.CoreOptions = { method: method };

    if (data) {
      data = DateParser.processDates(data);
      options.json = data;
    }

    if (this.accessToken) {
      options.headers = { Authorization: `Bearer ${this.accessToken}` };
    }

    return new Promise<T>((resolve, reject) => {
      request(`${this.baseUrl}${endpoint}`, options, (error, response, body) => {
        if (error) { return reject(error); }
        resolve(this.parse(body));
      });
    });
  }

  private loginWithBody(requestBody: string) {
    const options: request.CoreOptions = {
      body: requestBody,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    };

    return new Promise<ClientV2>((resolve, reject) => {
      request(`${this.baseUrl}oauth/token`, options, (error, response, body) => {
        if (error) { return reject(error); }

        const parsedBody = JSON.parse(body);
        const accessToken = parsedBody.access_token;
        if (!accessToken) { return reject(parsedBody); }

        this.accessToken = accessToken;
        resolve(this);
      });
    });
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
}

export interface IClientV2 {
  loginAsOwner(clientSecret: string): Promise<IClientV2>;
  loginAsUser(email: string, password: string): Promise<IClientV2>;
  get<T>(endpoint: string, data?: any): Promise<T>;
  post<T>(endpoint: string, data?: any): Promise<T>;
  put<T>(endpoint: string, data?: any): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}

export interface IClientV2Options {
  subdomain: string;
  clientId: string;
  domain?: string;
}
