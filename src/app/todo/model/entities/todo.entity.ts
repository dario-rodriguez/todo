import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { User } from '../../../core/user/model/entities/user.entity';

@Entity()
export class Todo extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  description!: string;
  @Column('tinyint', { nullable: false, default: 1 })
  priority!: number;
  @Column('boolean', { nullable: false, default: false })
  completed!: boolean;
  @Column('bigint', { nullable: false })
  userId!: number;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn()
  user?: User;
}
