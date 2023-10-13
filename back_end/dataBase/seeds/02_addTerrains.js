/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  
  await knex('terrains').del()
  await knex('terrains').insert([
    {tarif:7.0,id_terrain: 1, id_centre: 2,est_filme : true,localisation : 'interieur'},
    {tarif:8.5,id_terrain: 2, id_centre: 7,est_filme : false,localisation : 'exterieur'},
    {tarif:9.3,id_terrain: 3, id_centre: 4,est_filme : true,localisation : 'interieur'},
    {tarif:11.5,id_terrain: 4, id_centre: 6,est_filme : false,localisation : 'interieur'},
    {tarif:9.5,id_terrain: 5, id_centre: 1,est_filme : true,localisation : 'interieur'},
    {tarif:4.5,id_terrain: 6, id_centre: 3,est_filme : false,localisation : 'exterieur'},
    {tarif:6.5,id_terrain: 7, id_centre: 5,est_filme : true,localisation : 'interieur'},
    {tarif:9.5,id_terrain: 8, id_centre: 7,est_filme : false,localisation : 'exterieur'},
    {tarif:5.0,id_terrain: 9, id_centre: 7,est_filme : true,localisation : 'exterieur'},
    {tarif:9.5,id_terrain: 10, id_centre: 7,est_filme : false,localisation : 'interieur'},
    {tarif:7.5,id_terrain: 11, id_centre: 6,est_filme : false,localisation : 'exterieur'},
    {tarif:8.0,id_terrain: 12, id_centre: 7,est_filme : false,localisation : 'interieur'},
    {tarif:10.5,id_terrain: 13, id_centre: 7,est_filme : true,localisation : 'exterieur'},
  ]);
};
