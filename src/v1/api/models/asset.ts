import {IModel} from './model';

export interface IAssetCreateRequest {
  data_base64: string; // base 64 encoded file_name
  name: string;
  type: string; // content-type
  parent_id: number;
  parent_type: string;
}

export interface IAsset extends IModel {
  id: number;
  file_name: string;
  content_type: string;
  file_size: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
