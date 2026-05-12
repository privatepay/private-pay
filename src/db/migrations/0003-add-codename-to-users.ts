import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCodenameToUsers implements MigrationInterface {
  name = 'Tmp17769052848931776905285376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "codename" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN IF EXISTS "codename"`,
    );
  }
}

// mefius gostosoS
