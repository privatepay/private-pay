import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { EntitiesTypeORM } from './entities-data-source';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  synchronize: false,
  // logging: true,
  entities: EntitiesTypeORM,
  subscribers: [],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  migrationsRun: false,
  migrationsTableName: 'typeorm_version',
  migrationsTransactionMode: 'all',
});
