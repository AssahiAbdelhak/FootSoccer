// Update with your config settings.

import dotenv from "dotenv";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

dotenv.config({ path: '../.env' })
export default {

  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DATABASENAME,
      user: process.env.USERNAME,
      password: process.env.PASSWORD
    }, 
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
