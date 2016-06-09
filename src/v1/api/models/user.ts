import {IModel} from './model';

export interface IUser extends IModel {
  name?: string;
  email?: string;
  title?: string;
  url?: string;
  avatar_url?: string;
  karma_score?: number;
  created_at?: Date;
  updated_at?: Date;
}
