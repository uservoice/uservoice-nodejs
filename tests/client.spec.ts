import * as chai from 'chai';
import {Client} from '../src/v1/client';
import {FakeOAuthProvider} from './fixtures';

const subdomain = 'test';
const url = `https://${subdomain}.uservoice.com/api/v1/`;
const apiKey = 'apiKey';
const apiSecret = 'apiSecret';
const clientOptions = {
  apiKey: apiKey,
  apiSecret: apiSecret,
  subdomain: subdomain
};

describe('[Unit Tests]', () => {
  describe('UserVoice', () => {
    describe('Constructor', () => {
      it('should build the correct URL', () => {
        const provider = new FakeOAuthProvider();
        chai.expect(new Client(clientOptions, provider).getBaseUrl()).to.equal(url);
      });
    });

    describe('Date Parser', () => {
      function getDateResponse(dateValue: string) {
        const provider = new FakeOAuthProvider({
          get: {
            data: { created_at: '2016-01-01T00:00:00Z' }
          }
        });

        return new Client(clientOptions, provider).get('ok.json')
          .then((data: any) => {
            chai.expect(data.created_at instanceof Date).to.be.true;
          });
      }

      it('should parse date strings in YYYY-MM-DDTHH:mm:ssZ format', () => {
        return getDateResponse('2016-01-01T00:00:00Z');
      });

      it('should parse date strings in YYYY-MM-DDTHH:mm:SSSZ format', () => {
        return getDateResponse('2016-01-01T00:00:000Z');
      });

      it('should parse date strings in YYYY/MM/DD HH:mm:ss ZZ format', () => {
        return getDateResponse('2016/01/01 00:00:00 +0000');
      });
    });
  });
});
