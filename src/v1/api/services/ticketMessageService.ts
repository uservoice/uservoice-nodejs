import * as Promise from 'bluebird';
import {ApiService} from './apiService';
import {ITicketResponse} from '../models/ticket';
import {ITicketMessageListResponse, ITicketMessageCreateRequest} from '../models/ticketMessage';
import {IRequestOptions} from '../models/model';

export class TicketMessageService extends ApiService {
  /**
   * Adds a message to an existing ticket
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_ticket_id_ticket_messages_post
   */
  public create(ticketId: number, data: ITicketMessageCreateRequest): Promise<ITicketResponse> {
    if (!data.email && !this.client.getAccessToken()) {
      throw new Error('Cannot identify user for ticket. Set the email on ticket, or login as a user.');
    }

    return this.client.post<ITicketResponse>(`tickets/${ticketId}/ticket_messages.json`, data);
  }

  /**
   * Lists all messages for a ticket
   */
  public list(ticketId: number, options: IRequestOptions = {}): Promise<ITicketMessageListResponse> {
    options.per_page = options.per_page || this.client.requestOptions.pagination.max;
    return this.client.get<ITicketMessageListResponse>(`tickets/${ticketId}/ticket_messages.json`, options);
  }

  /**
   * Lists all messages for account
   */
  public listAll(options: IRequestOptions = {}): Promise<ITicketMessageListResponse>  {
    options.per_page = options.per_page || this.client.requestOptions.pagination.max;
    return this.client.get<ITicketMessageListResponse>('ticket_messages.json', options);
  }
}
