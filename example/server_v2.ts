import * as UserVoice from '../src/index';
import * as Promise from 'bluebird';
import {Config} from './config';

const testForumId = 0;
const testNpsRatingId = 0;
const testUserId = 0;

const client = new UserVoice.ClientV2({
  clientId: Config.apiKey,
  domain: Config.domain,
  subdomain: Config.subdomain
});

client.loginAsOwner(Config.apiSecret)
  .then(ownerClient => {
    const example = new Example(ownerClient);
    example.listForums();
  });

class Example {
  constructor(private uvClient: UserVoice.ClientV2) { }

  public listForums() {
    return this.defaultPromiseHandler(this.uvClient.forumService.list({
      per_page: 100
    }));
  }

  public getForum() {
    return this.defaultPromiseHandler(this.uvClient.forumService.get(testForumId));
  }

  public getNpsRatings() {
    return this.defaultPromiseHandler(this.uvClient.npsRatingService.list());
  }

  public getNpsRating() {
    return this.defaultPromiseHandler(this.uvClient.npsRatingService.get(testNpsRatingId));
  }

  public createNpsRating() {
    return this.defaultPromiseHandler(this.uvClient.npsRatingService.create({
      links: { user: testUserId },
      rating: 10
    }));
  }

  private defaultPromiseHandler(promise: Promise<any>) {
    return promise
      // tslint:disable-next-line
      .then(data => console.log(data))
      // tslint:disable-next-line
      .catch(error => console.log(error));
  }
}

// localdev: process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
