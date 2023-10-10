/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('terrains').del()
  await knex('terrains').insert([
    {id_terrain: 1, id_centre: 2,est_filme : true,localisation : 'interieur'},
    {id_terrain: 2, id_centre: 7,est_filme : false,localisation : 'exterieur'},
    {id_terrain: 3, id_centre: 4,est_filme : true,localisation : 'interieur'},
    {id_terrain: 4, id_centre: 6,est_filme : false,localisation : 'interieur'},
    {id_terrain: 5, id_centre: 1,est_filme : true,localisation : 'interieur'},
    {id_terrain: 6, id_centre: 3,est_filme : false,localisation : 'exterieur'},
    {id_terrain: 7, id_centre: 5,est_filme : true,localisation : 'interieur'},
  ]);
};
