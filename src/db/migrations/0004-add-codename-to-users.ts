import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCodenameToUsers implements MigrationInterface {
  name = 'AddCodenameToUsers1749330000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "codename" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_users_codename" UNIQUE ("codename")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "codename" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "codename"`);
  }
}
