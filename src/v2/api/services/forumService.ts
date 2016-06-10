import * as Promise from 'bluebird';
import {ApiService} from './apiService';
import {IForumResponse} from '../models/forum';
import {IRequest} from '../models/request';

export class ForumService extends ApiService {
  public list(data: IRequest = {}): Promise<IForumResponse> {
    return this.client.get<IForumResponse>('admin/forums', data);
  }

  public get(forumId: number, data: IRequest = {}): Promise<IForumResponse> {
    return this.client.get<IForumResponse>(`admin/forums/${forumId}`, data);
  }
}
