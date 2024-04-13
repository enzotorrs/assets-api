import { InjectRepository } from '@nestjs/typeorm';
import { AssetRepository } from './asset.repository';
import { Asset } from '../entities/asset.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetRepositoryTypeOrm implements AssetRepository {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async findById(id: number) {
    return this.assetRepository.findOneBy({ id: id });
  }

  async findAll() {
    return this.assetRepository.find();
  }

  async save(assetToSave: Asset) {
    return this.assetRepository.save(assetToSave);
  }

  async merge(asset: Asset, obj) {
    this.assetRepository.merge(asset, obj);
  }
}
