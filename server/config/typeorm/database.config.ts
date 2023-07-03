import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  name: process.env.TYPEORM_CONNECTION_NAME,
  database: process.env.TYPEORM_DATABASE,
  schema: process.env.TYPEORM_SCHEMA,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: [process.env.TYPEORM_ENTITIES] || [],
  migrations: [process.env.TYPEORM_MIGRATIONS] || [],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME || '',
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR || '',
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR || '',
  },
}));
