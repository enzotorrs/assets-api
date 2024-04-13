import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { AssetRepository } from './repositories/asset.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetRepositoryMock implements AssetRepository {
  assets: Asset[] = [];
  async findById(id: number) {
    return this.assets[id - 1];
  }
  async findAll() {
    return this.assets;
  }
  async merge(asset: Asset, obj) {
    return;
  }
  async save(asset: Asset) {
    this.assets.push(asset);
    return asset;
  }
}
