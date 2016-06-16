import * as Promise from 'bluebird';
import {ApiService} from './apiService';
import {ICustomFieldListRequest, ICustomFieldListResponse} from '../models/customField';

export class CustomFieldService extends ApiService {
  public list(data: ICustomFieldListRequest = {}): Promise<ICustomFieldListResponse> {
    return this.client.get<ICustomFieldListResponse>(`custom_fields.json`, data);
  }

  public public(data: ICustomFieldListRequest = {}): Promise<ICustomFieldListResponse> {
    return this.client.get<ICustomFieldListResponse>(`custom_fields/public.json`, data);
  }
}
