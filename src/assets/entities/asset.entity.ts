import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  folder?: boolean;

  @ManyToOne(() => Asset, (asset) => asset.parentAsset)
  parentAsset?: Asset;

  @OneToMany(() => Asset, (asset) => asset.parentAsset)
  childAssets?: Asset[];
}
