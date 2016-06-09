export interface IRequest {
  page?: number;
  per_page?: number;
  sort?: string;
  includes?: string[];
}
