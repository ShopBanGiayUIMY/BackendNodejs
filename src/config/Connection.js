import { createConnection } from 'mysql2';
import {config} from 'dotenv';

config();
const connection = () => {
  console.log(process.env.DATABASE_HOST, process.env.DATABASE_PORT, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, process.env.DATABASE_NAME)
  return createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
  })
}

export default connection;