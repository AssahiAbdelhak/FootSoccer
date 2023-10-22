// Update with your config settings.

import dotenv from "dotenv";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

dotenv.config({ path: '../.env' })
console.log(process.env.CLIENT)
export default {

  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.USER_NAME,
      password: process.env.PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
