import {IModel, IListResponse, IUploadAttachment, IAttachment} from './model';
import {IUser} from './user';
import {ITicket} from './ticket';

export interface ITicketNoteResponse {
  note: ITicketNote;
  ticket: ITicket;
}

export interface ITicketNoteListResponse extends IListResponse {
  notes: ITicketNote[];
}

export interface ITicketNoteCreationRequest {
  note: {
    text: string;
    attachments?: IUploadAttachment[]
    created_at?: Date;
    updated_at?: Date;
  };
}

export interface ITicketNote extends IModel {
  body?: string;
  creator: {
    user: IUser
  };
  attachments?: IAttachment[];
}
