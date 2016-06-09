import {IModel, IListResponse, IUploadAttachment} from './model';
import {ITicketMessage} from './ticketMessage';
import {IUser} from './user';

export interface ITicketResponse {
  ticket: ITicket;
}

export interface ITicketCreateRequest {
  email: string;
  name?: string;
  ticket: {
    state?: string; // open, closed
    subject: string;
    message: string;
    referrer?: string;
    attachments?: IUploadAttachment[];
    support_queued_id?: number;
    support_queue?: string;
    user_agent?: string;
    lang?: string;
    custom_field_values?: { [key: string]: string; };
    created_at?: Date;
    updated_at?: Date;
  };
}

export interface ITicketUpdateRequest {
  ticket: {
    assignee_id?: number;
    custom_field_values?: { [key: string]: string; };
    state?: string;
    subject?: string;
    support_queue?: string;
    support_queued_id?: number;
    created_at?: Date;
    updated_at?: Date;
  };
}

export interface ITicketListResponse extends IListResponse {
  tickets: ITicket[];
}

export interface ITicket extends IModel {
  ticket_number?: number;
  subject?: string;
  state?: string;
  url?: string;
  from_email_address?: string;
  custom_fields?: { [key: string]: string; };
  messages?: ITicketMessage[];
  assignee?: IUser;
  updated_by?: IUser;
  created_by?: IUser;
}
