import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from './types'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    user: 'postgres',
    password: '%Gayatree2',
    port: 5432,
    max: 10,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})