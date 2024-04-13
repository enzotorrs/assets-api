import { PartialType } from '@nestjs/mapped-types';

class BaseAssetDto {
  name: string;
  parentAssetId?: number;
}

export class CreateAssetDto extends BaseAssetDto {
  folder?: boolean;
}

export class UpdateAssetDto extends PartialType(BaseAssetDto) {}
