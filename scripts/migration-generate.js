#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Usage: pnpm migration:generate <MigrationName>');
  process.exit(1);
}

const migrationsDir = path.resolve(__dirname, '../src/db/migrations');

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

function toKebabCase(str) {
  return str.replace(/([A-Z])/g, (m, p, offset) => (offset > 0 ? '-' : '') + p.toLowerCase());
}

function nextSequentialNumber(dir) {
  const files = fs.readdirSync(dir).filter(f => /^\d{4}-/.test(f) && f.endsWith('.ts'));
  return String(files.length + 1).padStart(4, '0');
}

const tempName = `Tmp${Date.now()}`;
const tempRelPath = `src/db/migrations/${tempName}`;

const result = spawnSync(
  'npx',
  ['typeorm-ts-node-commonjs', 'migration:generate', tempRelPath, '-d', 'src/db/data-source.ts'],
  { stdio: 'inherit', encoding: 'utf8' },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const generatedFiles = fs.readdirSync(migrationsDir).filter(f => f.includes(tempName) && f.endsWith('.ts'));

if (generatedFiles.length === 0) {
  console.error('Generated migration file not found.');
  process.exit(1);
}

const generatedPath = path.join(migrationsDir, generatedFiles[0]);
let content = fs.readFileSync(generatedPath, 'utf8');

// Mantém o timestamp no name (exigido pelo TypeORM), mas limpa o class name
content = content.replace(/export class \S+( implements MigrationInterface)/, `export class ${migrationName}$1`);

const nextNum = nextSequentialNumber(migrationsDir);
const newFilename = `${nextNum}-${toKebabCase(migrationName)}.ts`;
const newPath = path.join(migrationsDir, newFilename);

fs.writeFileSync(newPath, content);
fs.unlinkSync(generatedPath);

console.log(`\nMigration generated: src/db/migrations/${newFilename}`);
