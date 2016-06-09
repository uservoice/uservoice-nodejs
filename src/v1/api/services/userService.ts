import {ApiService} from './apiService';

export class UserService extends ApiService {
  public updateEmail() {
    throw new Error('Not implemented.');
  }

  public show(data: any) {
    throw new Error('Not implemented.');
  }

  /**
   * Creates or Updates the user based on user.isNew()
   * @param {User} user
   */
  public upsert(user: any) {
    throw new Error('Not implemented.');
  }
}
