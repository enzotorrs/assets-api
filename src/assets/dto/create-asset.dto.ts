export class CreateAssetDto {
  name: string;
  folder?: boolean;
  parentAssetId?: number;
}
