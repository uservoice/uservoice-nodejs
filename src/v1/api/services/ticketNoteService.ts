import * as Promise from 'bluebird';
import {ApiService} from './apiService';
import {IRequestOptions} from '../models/model';
import {ITicketNoteResponse, ITicketNoteCreationRequest, ITicketNoteListResponse} from '../models/ticketNote';

export class TicketNoteService extends ApiService {
  public create(ticketId: number, request: ITicketNoteCreationRequest): Promise<ITicketNoteResponse> {
    return this.client.post<ITicketNoteResponse>(`tickets/${ticketId}/notes.json`, request);
  }

  public delete(ticketId: number, noteId: number): Promise<void> {
    return this.client.delete<void>(`tickets/${ticketId}/notes/${noteId}.json`);
  }

  public list(ticketId: number, options: IRequestOptions = {}): Promise<ITicketNoteListResponse> {
    return this.client.get<ITicketNoteListResponse>(`tickets/${ticketId}/notes.json`, options);
  }
}
