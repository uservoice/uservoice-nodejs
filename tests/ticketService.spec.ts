import * as chai from 'chai';
import * as moment from 'moment';
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
 */
let apiTicketData: any = null;

describe('[Unit Tests]', () => {
  beforeEach(() => {
    apiTicketData = {
      created_at: moment('2016-01-01T00:00:000Z').toDate(),
      custom_fields: [
        { key: 'key1', value: 'value1' }
      ],
      id: 1,
      state: 'state',
      subject: 'subject',
      ticket_number: 1
    };
  });

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

    describe('Show', () => {
      it('should process custom_fields into hash-like object', () => {
        const tickets = buildTickets({
          get: { data: { ticket: apiTicketData } }
        });

        return tickets.show(1)
          .then(data => {
            chai.assert.strictEqual(data.ticket.custom_fields['key1'], 'value1');
          });
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
