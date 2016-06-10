import * as UserVoice from '../src/index';
import * as fs from 'fs';
import * as path from 'path';
import * as Promise from 'bluebird';
import {Config} from './config';

const testTicketId = 0;
const testNoteId = 0;
const testAssetId = 0;
const client = new UserVoice.Client({
  apiKey: Config.apiKey,
  apiSecret: Config.apiSecret,
  domain: Config.domain,
  subdomain: Config.subdomain
});

client.loginAsOwner()
  .then(ownerClient => {
    const example = new Example(ownerClient);
    example.listTickets();
  });

class Example {
  constructor(private uvClient: UserVoice.Client) { }

  public getAsset() {
    return this.defaultPromiseHandler(this.uvClient.ticketAssetService.show(testAssetId));
  }

  public createTicket() {
    return this.defaultPromiseHandler(this.uvClient.ticketService.create({
      email: 'testuser@test123498888391.com',
      name: 'Test User',
      ticket: {
        created_at: new Date(2014, 0, 0, 0, 0, 0, 0),
        custom_field_values: {
          'test-key': 'test-value'
        },
        message: 'This is the body',
        state: 'open',
        subject: 'Test Ticket',
        updated_at: new Date(2014, 0, 0, 0, 0, 0, 0)
      }
    }));
  }

  public createMessage() {
    return this.defaultPromiseHandler(this.uvClient.ticketMessageService.create(testTicketId, {
      ticket_message: {
        created_at: new Date(2016, 0, 0, 0, 0, 0, 0),
        text: 'this is a message',
        updated_at: new Date(2016, 1, 0, 0, 0, 0, 0)
      }
    }));
  }

  public createAsset() {
    return getBase64EncodedFile()
      .then(file => {
        return this.defaultPromiseHandler(this.uvClient.ticketAssetService.create({
          data_base64: file,
          name: 'file.txt',
          parent_id: 0,
          parent_type: 'TicketNote',
          type: 'text/plain'
        }));
      });
  }

  public deleteAsset() {
    return getBase64EncodedFile()
      .then(file => {
        return this.defaultPromiseHandler(this.uvClient.ticketAssetService.delete(testAssetId));
      });
  }

  public listNotes() {
    return this.defaultPromiseHandler(this.uvClient.ticketNoteService.list(testTicketId));
  }

  public deleteNote() {
    return this.defaultPromiseHandler(this.uvClient.ticketNoteService.delete(testTicketId, testNoteId));
  }

  public createNote() {
    return this.defaultPromiseHandler(this.uvClient.ticketNoteService.create(testTicketId, {
      note: {
        created_at: new Date(2015, 1, 1, 0, 0, 0, 0),
        text: 'Some text',
        updated_at: new Date(2015, 1, 1, 0, 0, 0, 0)
      }
    }));
  }

  public updateTicket() {
    return this.defaultPromiseHandler(this.uvClient.ticketService.update(testTicketId, {
      ticket: {
        created_at: new Date(2012, 1, 1, 0, 0, 0, 0),
        custom_field_values: {
          'my-field': 'my-value'
        },
        subject: 'Some edits',
        updated_at: new Date(2012, 1, 1, 0, 0, 0, 0)
      }
    }));
  }

  public listTickets() {
    return this.defaultPromiseHandler(this.uvClient.ticketService.list());
  }

  public showTicket() {
    return this.defaultPromiseHandler(this.uvClient.ticketService.show(testTicketId));
  }

  public listMessages() {
    return this.defaultPromiseHandler(this.uvClient.ticketMessageService.list(testTicketId));
  }

  public listAllMessages() {
    return this.defaultPromiseHandler(this.uvClient.ticketMessageService.listAll());
  }

  private defaultPromiseHandler(promise: Promise<any>) {
    return promise
      // tslint:disable-next-line
      .then(data => console.log(data))
      // tslint:disable-next-line
      .catch(error => console.log(error));
  }
}

function getBase64EncodedFile(): Promise<string> {
  'use strict';

  const filePath = path.join(__dirname, 'attachment.txt');

  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) { reject('There was a problem reading the file from disk.'); }
      resolve(new Buffer(data).toString('base64'));
    });
  });
}

// localdev: process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
