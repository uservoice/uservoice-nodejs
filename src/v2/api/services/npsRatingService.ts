import * as Promise from 'bluebird';
import {ApiService} from './apiService';
import {INpsRatingListRequest, INpsRatingResponse, INpsRatingRequest, INpsRatingCreateRequest} from '../models/npsRating';

export class NpsRatingService extends ApiService {
  public list(data: INpsRatingListRequest = {}): Promise<INpsRatingResponse> {
    return this.client.get<INpsRatingResponse>('admin/nps_ratings', data);
  }

  public get(npsRatingId: number, data: INpsRatingRequest = {}): Promise<INpsRatingResponse> {
    return this.client.get<INpsRatingResponse>(`admin/nps_ratings/${npsRatingId}`, data);
  }

  public create(data: INpsRatingCreateRequest): Promise<INpsRatingResponse> {
    return this.client.post<INpsRatingResponse>('admin/nps_ratings', data);
  }
}
