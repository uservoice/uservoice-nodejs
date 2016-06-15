import * as Promise from 'bluebird';
import {IRequestOptions} from '../models/model';
import {ITicketResponse, ITicketListResponse, ITicketCreateRequest, ITicketUpdateRequest, ITicket} from '../models/ticket';
import {ApiService} from './apiService';

export class TicketService extends ApiService {
  public create(data: ITicketCreateRequest): Promise<ITicketResponse> {
    if (!data.email && !this.client.getAccessToken()) {
      throw new Error('Not authorized to create ticket; must login first.');
    }

    return this.client.post<ITicketResponse>('tickets.json', data)
      .then(responseData => this.processTicketResponseCustomFields(responseData));
  }

  public update(ticketId: number, ticketData: ITicketUpdateRequest): Promise<ITicketResponse> {
    return this.client.put<ITicketResponse>(`tickets/${ticketId}.json`, ticketData)
      .then(data => this.processTicketResponseCustomFields(data));
  }

  /**
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_get
   */
  public list(options: IRequestOptions = {}): Promise<ITicketListResponse> {
    options.per_page = options.per_page || this.client.requestOptions.pagination.max;
    return this.client.get<ITicketListResponse>('tickets.json', options)
      .then(data => this.processTicketListResponseCustomFields(data));
  }

  /**
   * Searches for tickets
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_search_get
   * @link http://feedback.uservoice.com/knowledgebase/articles/49267-how-do-i-search-for-and-sort-through-tickets-
   */
  public search(query: string, options: IRequestOptions = {}): Promise<ITicketListResponse> {
    options.per_page = options.per_page || this.client.requestOptions.pagination.max;
    options.query = query;

    return this.client.get<ITicketListResponse>('tickets/search.json', options)
      .then(data => this.processTicketListResponseCustomFields(data));
  }

  /**
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_ticket_id_get
   */
  public show(ticketId: number): Promise<ITicketResponse> {
    if (!ticketId) {
      throw new Error('ticketId cannot be empty');
    }

    return this.client.get<ITicketResponse>(`tickets/${ticketId}.json`)
      .then(data => this.processTicketResponseCustomFields(data));
  }

  private processTicketResponseCustomFields(ticketResponse: ITicketResponse) {
    this.convertCustomFieldsToObject(ticketResponse.ticket);
    return ticketResponse;
  }

  private processTicketListResponseCustomFields(ticketListResponse: ITicketListResponse) {
    ticketListResponse.tickets.forEach(t => this.convertCustomFieldsToObject(t));
    return ticketListResponse;
  }

  private convertCustomFieldsToObject(ticket: ITicket) {
    if (!ticket.custom_fields) { return; }

    const object: { [key: string]: string} = {};

    const rawCustomFields: { key: string; value: string }[] = ticket.custom_fields as any;
    rawCustomFields.forEach(customField => {
      object[customField.key] = customField.value;
    });

    ticket.custom_fields = object;
  }
}
