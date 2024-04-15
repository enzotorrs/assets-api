import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from './asset.dto';
import { AssetRepository } from './repositories/asset.repository';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @Inject(AssetRepository) private assetRepository: AssetRepository,
  ) {}

  async create(assetToCreate: CreateAssetDto) {
    const asset = new Asset();
    if (assetToCreate.parentAssetId) {
      const parentAsset = await this.getParentAsset(
        assetToCreate.parentAssetId,
      );
      asset.parentAsset = parentAsset;
    }
    this.assetRepository.merge(asset, assetToCreate);
    return await this.assetRepository.save(asset);
  }

  async findAll() {
    return await this.assetRepository.findAll();
  }

  async findOne(id: number) {
    return await this.assetRepository.findById(id);
  }

  async update(id: number, asset: UpdateAssetDto) {
    const assetToUpdate = await this.getAssetToUpdate(id, asset);
    if (asset.parentAssetId) {
      const parentAsset = await this.getParentAsset(asset.parentAssetId);
      assetToUpdate.parentAsset = parentAsset;
    }
    this.assetRepository.merge(assetToUpdate, asset);
    return this.assetRepository.save(assetToUpdate);
  }

  private async getParentAsset(id: number): Promise<Asset> {
    const parentAsset = await this.assetRepository.findById(id);
    if (!parentAsset || !parentAsset.folder) {
      throw new HttpException(
        'parent asset not exists or is not a folder',
        HttpStatus.BAD_REQUEST,
      );
    }
    return parentAsset;
  }

  private async getAssetToUpdate(
    id: number,
    asset: UpdateAssetDto,
  ): Promise<Asset> {
    const assetToUpdate = await this.assetRepository.findById(id);
    if (!assetToUpdate) {
      throw new HttpException(
        'asset with this given id not exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (asset.parentAssetId === assetToUpdate.id) {
      throw new HttpException(
        'parent asset id cannot be same as asset id',
        HttpStatus.BAD_REQUEST,
      );
    }
    return assetToUpdate;
  }
}
