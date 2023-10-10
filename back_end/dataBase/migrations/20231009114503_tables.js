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
            table.float('tarif',3,1).notNullable();
            table.timestamps(true,true);
        });
        await knex.schema.createTable('terrains',function(table) {
            table.increments('id_terrain').primary();
            table.integer('id_centre');
            table.foreign('id_centre').references('centres.id_centre');
            table.boolean('est_filme').notNullable();
            table.string('localisation').checkIn(['interieur','exterieur']);
            table.timestamps(true,true);
        })
        
        await knex.schema.createTable('utilisateurs',function(table) {
            table.increments('id_utilisateur').primary();
            table.string('nom_complet').notNullable();
            table.string('niveau').checkIn(['debutant','intermidiaire','confirme']).notNullable();
            table.integer('matchs_joues').defaultTo(0);
            table.date('date_naiss').notNullable();
            table.integer('total_notes').defaultTo(0);
            table.integer('nb_notes').defaultTo(0);
            table.string('num_tel').unique();
            table.string('email').unique().notNullable();
            table.string('mot_de_passe').notNullable();
            table.timestamps(true,true);
        });
        await knex.schema.createTable('resa_terrain',(table) => {
            table.integer('id_terrain').primary().references('terrains.id_terrain');
            table.time('debut').notNullable();
            table.integer('duree').notNullable();
            table.timestamps(true,true);
        });
        await knex.schema.createTable('resa_utilisateurs',(table) => {
            table.integer('id_utilisateur').references('utilisateurs.id_utilisateur');
            table.integer('id_terrain').references('terrains.id_terrain');
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
        knex.schema.dropTableIfExists('terrains'),
        knex.schema.dropTableIfExists('centres'),
    ]);

};
