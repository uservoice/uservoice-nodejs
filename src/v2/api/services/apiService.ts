import {IClientV2} from '../../client';

export abstract class ApiService {
  protected client: IClientV2;

  constructor(client: IClientV2) {
    this.client = client;
  }
}
