import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1586954349045 implements MigrationInterface {
  name = 'CreateTables1586954349045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" integer NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" integer NOT NULL DEFAULT (0))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" integer NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar(255) NOT NULL, "priority" tinyint NOT NULL DEFAULT (1), "completed" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL, CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
  }
}
