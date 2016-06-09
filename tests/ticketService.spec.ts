import * as chai from 'chai';
import {Client} from '../src/v1/client';
import {TicketService} from '../src/v1/api/services/ticketService';
import {FakeOAuthProvider, IResponseOptions} from './fixtures';

const ticketData = {
  email: 'email',
  name: 'name',
  ticket: {
    message: 'message',
    subject: 'subject'
  }
};

/**
 * Sample return data from ticket API
 * Useful for methods that call Ticket.fromApi
 */
const apiTicketData = {
  created_at: '2016-01-01T00:00:000Z',
  created_by: 'created_by',
  custom_fields: [{
    'key1': 'value1'
  }],
  id: 'id',
  last_message_at: '2016-01-01T00:00:000Z',
  state: 'state',
  subject: 'subject',
  ticket_number: 'ticket_number',
  updated_by: 'updated_by'
};

describe('[Unit Tests]', () => {
  describe('Tickets', () => {
    describe('Create', () => {
      it('should post ticket data', () => {
        const expectedResult = { ticket: apiTicketData };
        const tickets = buildTickets({
          post: { data: expectedResult }
        });

        return tickets.create(ticketData)
          .then(data => {
            chai.assert.strictEqual(data, expectedResult);
          });
      });

      it('should reject with error', () => {
        const errorMessage = 'error message';
        const tickets = buildTickets({
          post: { error: errorMessage }
        });

        return tickets.create(ticketData)
          .catch(error => chai.assert.strictEqual(error, errorMessage));
      });
    });
  });
});

function buildTickets(expectedResponse: IResponseOptions) {
  'use strict';

  const client = new Client({
    apiKey: 'apiKey',
    apiSecret: 'apiSecret',
    subdomain: 'test'
  }, new FakeOAuthProvider(expectedResponse));

  return new TicketService(client);
}
