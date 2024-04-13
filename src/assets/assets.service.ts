import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetRepository } from './repositories/asset.repository';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @Inject(AssetRepository) private assetRepository: AssetRepository,
  ) { }

  async create(assetToCreate: CreateAssetDto) {
    const asset = new Asset();
    if (assetToCreate.parentAssetId) {
      const parentAsset = await this.assetRepository.findById(
        assetToCreate.parentAssetId,
      );
      if (!parentAsset || !parentAsset.folder) {
        throw new HttpException(
          'parent asset not exists or is not a folder',
          HttpStatus.BAD_REQUEST,
        );
      }
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
}
