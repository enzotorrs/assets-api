import { Asset } from '../entities/asset.entity';

export interface AssetRepository {
  findById: (id: number) => Promise<Asset>;
  findAll: () => Promise<Asset[]>;
  save: (asset: Asset) => Promise<Asset>;
  merge: (asset: Asset, obj: any) => void;
}

export const AssetRepository = Symbol('AssetRepository');
