export interface IModel {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IResponseData {
  page: number;
  per_page: number;
  total_records: number;
  filter: string;
  sort: string;
}

export interface IListResponse {
  response_data: IResponseData;
}

/**
 * Data about an attachment that has already been uploaded
 */
export interface IAttachment {
  url: string;
  temporary_url: string;
  name: string;
  size_in_bytes: number;
  created_at: Date;
}

/**
 * Data about an attachment that has yet to be uploaded
 */
export interface IUploadAttachment {
  name: string;
  data: string; // base 64 encoded
  content_type: string;
}

export interface IRequestOptions {
  pagination?: {
    max?: number
  };
  per_page?: number;
  query?: string;
}
