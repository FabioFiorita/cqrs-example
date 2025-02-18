## Installation

```bash
$ pnpm install
```

## Setting up the Database

1. **Pull the PostgreSQL Docker image** (if you haven't already):
   ```bash
   docker pull bitnami/postgresql:latest
   ```

2. **Run the PostgreSQL container**:
   ```bash
   docker run --name postgresql -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_PASSWORD=postgres -e POSTGRESQL_DATABASE=mydb -p 5432:5432 -d bitnami/postgresql:latest
   ```

3. **Update your `.env` file** with the database connection string:
   ```dotenv
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
   ```

4. **Run Prisma commands** to generate the client and migrate the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Seeding the Database

1. **Run the seed script**:
   ```bash
   npx ts-node prisma/seed.ts
   ```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov