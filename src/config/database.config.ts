import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbType = 'postgres';

export default (): TypeOrmModuleOptions => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'database',
  type: dbType,
  autoLoadEntities: true,
});
