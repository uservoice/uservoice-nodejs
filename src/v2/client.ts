import * as request from 'request';
import * as q from 'q';
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
    const deferred = q.defer<T>();
    const options: request.CoreOptions = { method: method };

    if (data) {
      data = DateParser.processDates(data);
      options.json = data;
    }

    if (this.accessToken) {
      options.headers = { Authorization: `Bearer ${this.accessToken}` };
    }

    request(`${this.baseUrl}${endpoint}`, options, (error, response, body) => {
      if (error) { return deferred.reject(error); }

      deferred.resolve(this.parse(body));
    });

    return deferred.promise;
  }

  private loginWithBody(requestBody: string) {
    const deferred = q.defer<ClientV2>();
    const options: request.CoreOptions = {
      body: requestBody,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    };

    request(`${this.baseUrl}oauth/token`, options, (error, response, body) => {
      if (error) { return deferred.reject(error); }

      const parsedBody = JSON.parse(body);
      const accessToken = parsedBody.access_token;
      if (!accessToken) { return deferred.reject(parsedBody); }

      this.accessToken = accessToken;
      deferred.resolve(this);
    });

    return deferred.promise;
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
  loginAsOwner(clientSecret: string): Q.Promise<IClientV2>;
  loginAsUser(email: string, password: string): Q.Promise<IClientV2>;
  get<T>(endpoint: string, data?: any): Q.Promise<T>;
  post<T>(endpoint: string, data?: any): Q.Promise<T>;
  put<T>(endpoint: string, data?: any): Q.Promise<T>;
  delete<T>(endpoint: string): Q.Promise<T>;
}

export interface IClientV2Options {
  subdomain: string;
  clientId: string;
  domain?: string;
}
