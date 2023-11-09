/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import knex from '../knexfile.js'

const ON_UPDATE_TIMESTAMP_FUNCTION = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';
`
export const up = async function(knex) {
        await knex.schema.createTable('centres',function(table) {
            table.increments('id_centre').primary();
            table.string('nom_centre').notNullable().unique();
            table.string('image').default('default.jpg');
            table.string('adr_centre').notNullable();
            table.integer('nb_terrains').default(1);
            table.float('tarif',3,1).notNullable();
            table.timestamps(true,true);
        });
        
        
        await knex.schema.createTable('utilisateurs',function(table) {
            table.increments('id_utilisateur').primary();
            table.boolean('isVerified').defaultTo(true);
            table.string('nom_complet').notNullable();
            table.string('role').checkIn(['admin','utilisateur']).notNullable();
            table.string('niveau').checkIn(['débutant','intermidiaire','confirmé']).notNullable();
            table.date('date_naiss').notNullable();
            table.string('num_tel').unique();
            table.string('email').unique().notNullable();
            table.string('mot_de_passe').notNullable();
            table.timestamps(true,true);
        });
        await knex.schema.createTable('resa_terrain',(table) => {
            table.increments('id_resa');
            table.integer('id_centre').references('centres.id_centre');
            table.date('date').notNullable();
            table.integer('debut').checkBetween([0,23]);
            table.primary(['id_centre','date','debut'])
            table.timestamps(true,true);
        });
        await knex.schema.createTable('resa_utilisateurs',(table) => {
            table.integer('id_resa');
            table.integer('id_utilisateur').references('utilisateurs.id_utilisateur');
            table.timestamps(true,true);
        });
        return Promise.resolve();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {

    return Promise.all([
        knex.schema.dropTableIfExists('resa_utilisateurs'),
        knex.schema.dropTableIfExists('resa_terrain'),
        knex.schema.dropTableIfExists('utilisateurs'),
        knex.schema.dropTableIfExists('centres'),
    ]);

};
