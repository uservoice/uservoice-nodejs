import {IModel, IResponse} from './model';

export interface IForumResponse extends IResponse {
  forums: IForum[];
}

export interface IForum extends IModel {
  name: string;
  welcome_message?: string;
  welcome_message_mime_type?: string;
  prompt: string;
  example: string;
  portal_url: string;
  open_suggestions_count: number;
  suggestions_count: number;
  is_public: boolean;
  is_private: boolean;
  classic_voting: boolean;
  links: {
    updated_by: number
  };
}
