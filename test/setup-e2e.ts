import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable');
  }

  // Drop and recreate the schema using Prisma
  await prisma.$executeRawUnsafe('DROP SCHEMA IF EXISTS test_schema CASCADE');
  await prisma.$executeRawUnsafe('CREATE SCHEMA test_schema');

  // Run migrations in the test schema
  execSync('pnpm prisma migrate deploy');

  await prisma.$disconnect();
  console.log('Test database setup completed');
};
