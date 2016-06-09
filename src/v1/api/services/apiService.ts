import {Client} from '../../client';

export abstract class ApiService {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
