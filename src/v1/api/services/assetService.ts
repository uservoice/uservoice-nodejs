import * as Promise from 'bluebird';
import {ApiService} from './apiService';
import {IAsset, IAssetCreateRequest} from '../models/asset';

export class AssetService extends ApiService {
  public create(data: IAssetCreateRequest): Promise<IAsset> {
    return this.client.post<IAsset>(`assets.json`, data);
  }

  public show(assetId: number): Promise<IAsset> {
    return this.client.get<IAsset>(`assets/${assetId}.json`);
  }

  public delete(assetId: number): Promise<void> {
    return this.client.delete<void>(`assets/${assetId}`);
  }
}
