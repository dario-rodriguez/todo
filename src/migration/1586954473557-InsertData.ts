import { genSalt, hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { roles } from '../app/core/auth/model/roles.enum';
import { User } from '../app/core/user/model/entities/user.entity';
import { Todo } from '../app/todo/model/entities/todo.entity';

export class InsertData1586954473557 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.save(User, {
      username: 'user',
      password: await hash('pass', await genSalt(12)),
      role: roles.USER,
    });
    await queryRunner.manager.save(User, {
      username: 'admin',
      password: await hash('admin', await genSalt(12)),
      role: roles.ADMIN,
    });
    await queryRunner.manager.save(Todo, {
      description: 'Remember the milk',
      priority: 1,
      completed: false,
      userId: 1,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM "user"');
    await queryRunner.query('DELETE FROM "todo"');
  }
}
