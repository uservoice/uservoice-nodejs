import {IRequestOptions} from '../models/model';
import {ITicketResponse, ITicketListResponse, ITicketCreateRequest, ITicketUpdateRequest} from '../models/ticket';
import {ApiService} from './apiService';

export class TicketService extends ApiService {
  public create(data: ITicketCreateRequest) {
    if (!data.email && !this.client.getAccessToken()) {
      throw new Error('Not authorized to create ticket; must login first.');
    }

    return this.client.post<ITicketResponse>('tickets.json', data);
  }

  public update(ticketId: number, ticketData: ITicketUpdateRequest) {
    return this.client.put<ITicketResponse>(`tickets/${ticketId}.json`, ticketData);
  }

  /**
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_get
   */
  public list(options: IRequestOptions = {}) {
    options.per_page = options.per_page || this.client.requestOptions.pagination.max;
    return this.client.get<ITicketListResponse>('tickets.json', options);
  }

  /**
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_custom_fields_get
   */
  public getCustomFields(includePublic: boolean) {
    return this.client.get<any>(includePublic ? 'custom_fields/public.json' : 'custom_fields.json');
  }

  /**
   * Searches for tickets
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_search_get
   * @link http://feedback.uservoice.com/knowledgebase/articles/49267-how-do-i-search-for-and-sort-through-tickets-
   */
  public search(query: string, options: IRequestOptions = {}) {
    options.per_page = options.per_page || this.client.requestOptions.pagination.max;
    options.query = query;

    return this.client.get<ITicketListResponse>('tickets/search.json', options);
  }

  /**
   * @link https://developer.uservoice.com/docs/api/reference/#_api_v1_tickets_ticket_id_get
   */
  public show(ticketId: number) {
    if (!ticketId) {
      throw new Error('ticketId cannot be empty');
    }

    return this.client.get<ITicketResponse>(`tickets/${ticketId}.json`);
  }
}
