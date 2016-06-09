import {IRequest} from './request';
import {IModel, IResponse} from './model';

export interface INpsRatingListRequest extends IRequest {
  period_start?: Date;
  period_end?: Date;
  user?: number[];
  ticket?: number[];
  includes?: string[];
}

export interface INpsRatingRequest {
  includes?: string[];
}

export interface INpsRatingResponse extends IResponse {
  nps_ratings: INpsRating[];
}

export interface INpsRatingCreateRequest {
  rating: number;
  links: {
    user: number;
  };
  prompt?: string;
  body?: string;
  date?: Date;
  includes?: string[];
}

export interface INpsRating extends IModel {
  rating: number;
  previous_rating: number;
  rating_delta: number;
  body: string;
  prompt: string;
  traits: {
    type: string;
    activity: string;
    account_name: string;
    account_monthly_rate: number;
    account_plan: string;
    account_ltv: number;
    rate_type: string;
    satisfaction_score: number;
    satisfaction_group: string;
    created_at: number;
  };
  links: {
    user: number;
    ticket: number;
  };
}
