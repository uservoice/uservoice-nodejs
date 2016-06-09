import {ApiService} from './apiService';
import {IAsset, IAssetCreateRequest} from '../models/asset';

export class AssetService extends ApiService {
  public create(data: IAssetCreateRequest) {
    return this.client.post<IAsset>(`assets.json`, data);
  }

  public show(assetId: number) {
    return this.client.get<IAsset>(`assets/${assetId}.json`);
  }

  public delete(assetId: number) {
    return this.client.delete<void>(`assets/${assetId}`);
  }
}
