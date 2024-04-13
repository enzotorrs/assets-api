import { Module } from '@nestjs/common';
import { AssetsModule } from './assets/assets.module';
import { Asset } from './assets/entities/asset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AssetsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'main',
      entities: [Asset],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
