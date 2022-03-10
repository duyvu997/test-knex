'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:mysecretpassword@localhost:5432/knex-test',
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  staging: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`,
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_NAME || 'my_db',
      user: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
