#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Usage: pnpm migration:create <MigrationName>');
  process.exit(1);
}

const migrationsDir = path.resolve(__dirname, '../src/db/migrations');

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

function toKebabCase(str) {
  return str.replace(/([A-Z])/g, (m, p, offset) => (offset > 0 ? '-' : '') + p.toLowerCase());
}

const existing = fs.readdirSync(migrationsDir).filter(f => /^\d{4}-/.test(f) && f.endsWith('.ts'));
const nextNum = String(existing.length + 1).padStart(4, '0');
const filename = `${nextNum}-${toKebabCase(migrationName)}.ts`;
const filePath = path.join(migrationsDir, filename);

const template = `import { MigrationInterface, QueryRunner } from 'typeorm';

export class ${migrationName} implements MigrationInterface {
  name = '${migrationName}';

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
`;

fs.writeFileSync(filePath, template);
console.log(`Migration created: src/db/migrations/${filename}`);
