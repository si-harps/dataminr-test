import { Pool } from 'pg';

// Pool declared outside handler function scope
// to ensure that it can be shared by each future invocation of the function
const pool = new Pool({
  user: 'postgres',
  password: process.env.APP_DB_PASS,
  host: 'localhost',
  database: 'dataminr',
  port: 5432,
});

export default pool;