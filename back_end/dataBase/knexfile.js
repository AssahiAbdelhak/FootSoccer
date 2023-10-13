// Update with your config settings.

import dotenv from "dotenv";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

dotenv.config({ path: './.env' })
export default {

  development: {
    client: 'postgresql',
    connection: {
      database: 'site_foot',
      user:     'postgres',
      password: 'admin'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  onUpdateTable : table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
};
