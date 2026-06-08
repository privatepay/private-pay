import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLanguageToUsers implements MigrationInterface {
  name = 'Tmp17769042848931776904285376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "language" character varying NOT NULL DEFAULT 'pt-BR'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "language"`);
  }
}
