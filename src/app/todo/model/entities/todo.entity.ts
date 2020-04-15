import { CrudValidationGroups } from '@nestjsx/crud';
import { IsBoolean, IsDefined, IsEmpty, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../../core/user/model/entities/user.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class Todo extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  @IsDefined({ groups: [CrudValidationGroups.CREATE] })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @MaxLength(255)
  @IsString()
  description!: string;
  @Column('tinyint', { nullable: false, default: 1 })
  @IsDefined({ groups: [CrudValidationGroups.CREATE] })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsInt()
  @Min(1)
  @Max(5)
  priority!: number;
  @Column('boolean', { nullable: false, default: false })
  @IsEmpty({ groups: [CrudValidationGroups.CREATE] })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsBoolean({ groups: [CrudValidationGroups.UPDATE] })
  completed?: boolean;
  @Column('bigint', { nullable: false })
  userId!: number;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn()
  user?: User;
}
