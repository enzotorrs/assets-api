import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetRepositoryTypeOrm } from './repositories/typeormAsset.repository';
import { AssetRepository } from './repositories/asset.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [AssetsController],
  providers: [
    AssetsService,
    { provide: AssetRepository, useClass: AssetRepositoryTypeOrm },
  ],
})
export class AssetsModule {}
