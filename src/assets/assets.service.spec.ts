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

describe('AssetsService', () => {
  let service: AssetsService;
  let assetRepositoryMock: AssetRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        { provide: AssetRepository, useClass: AssetRepositoryMock },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
    assetRepositoryMock = module.get<AssetRepositoryMock>(AssetRepository);
  });

  it('should return a empty array', async () => {
    const assets = await service.findAll();
    expect(assets).toEqual([]);
  });

  it('should return all assets', async () => {
    const asset = new Asset();
    asset.name = 'teste asset';
    asset.folder = false;
    assetRepositoryMock.assets.push(asset);

    const assets = await service.findAll();
    expect(assets.length).toBe(assetRepositoryMock.assets.length);
  });

  it('should return a asset by id', async () => {
    const asset = new Asset();
    asset.name = 'teste asset';
    asset.folder = false;
    assetRepositoryMock.assets.push(asset);

    const asset2 = new Asset();
    asset2.name = 'teste asset 2';
    asset2.folder = false;
    assetRepositoryMock.assets.push(asset2);

    const assetStored = await service.findOne(1);
    const assetStored2 = await service.findOne(2);
    expect(assetStored.name).toBe('teste asset');
    expect(assetStored2.name).toBe('teste asset 2');
  });
  it('should add new asset when is valid', async () => {
    expect(assetRepositoryMock.assets.length).toBe(0);
    expect(await service.create({ name: 'teste' })).toBeInstanceOf(Asset);
    expect(assetRepositoryMock.assets.length).toBe(1);
  });
  it('should throw bad request error when parent asset is not a folder', () => {
    const parentAsset = new Asset();
    parentAsset.name = 'teste parent asset';
    parentAsset.folder = false;
    assetRepositoryMock.assets.push(parentAsset);

    expect(async () => {
      await service.create({ name: 'test', parentAssetId: 1 });
    }).rejects.toThrow(
      new HttpException(
        'parent asset must be a folder',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
