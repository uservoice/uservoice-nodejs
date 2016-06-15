import {IListResponse, IRequestOptions, IModel} from './model';

export interface ICustomFieldListRequest extends IRequestOptions {
  updated_after_date?: Date;
}

export interface ICustomFieldListResponse extends IListResponse {
  custom_fields: ICustomField[];
}

export interface ICustomField extends IModel {
  name: string;
  description: string;
  activate: boolean;
  private: boolean;
  predefined: boolean;
  read_only: boolean;
  allow_blank?: boolean;
  possible_values?: IPossibleCustomFieldValue[];
}

export interface IPossibleCustomFieldValue extends IModel {
  value: string;
  active: boolean;
}
