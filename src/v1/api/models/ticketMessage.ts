import {IModel, IListResponse, IAttachment, IUploadAttachment} from './model';
import {IUser} from './user';
import {ITicket} from './ticket';

export interface ITicketMessageListResponse extends IListResponse {
  messages: ITicketMessage[];
}

export interface ITicketMessageCreateRequest {
  email?: string;
  ticket_message: {
    text: string;
    attachments?: IUploadAttachment[];
    ticket_email_alias?: string;
    ccs_on_email?: string[];
    bccs_on_email?: string[];
    created_at?: Date;
    updated_at?: Date;
  };
}

export interface ITicketMessageResponse {
  ticket: ITicket;
  message: ITicketMessage;
}

export interface ITicketMessage extends IModel {
  body?: string;
  is_admin_response?: boolean;
  recipient?: IUser;
  sender?: IUser;
  attachments?: IAttachment[];
  ccs?: ICopiedUser[];
  bccs?: ICopiedUser[];
  ticket?: ITicket;
}

export interface ICopiedUser {
  user?: {
    id?: string
  };
  email?: string;
}
