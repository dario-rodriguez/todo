import { ApiHideProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import { IsDefined, IsEmpty, IsInt } from 'class-validator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsDefined({ groups: [CrudValidationGroups.UPDATE] })
  @IsInt({ groups: [CrudValidationGroups.UPDATE] })
  id!: number;

  @VersionColumn({ default: 1 })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  version!: number;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  createdAt!: string;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  updatedAt!: string;
}
