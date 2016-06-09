export interface IResponse {
  links?: { [key: string]: string; };
  pagination?: IPagination;
}

export interface IModel {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IPagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
}
