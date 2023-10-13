/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('resa_terrain').del()
  await knex('terrains').del()
  await knex('centres').del()
  await knex('centres').insert([
    {id_centre: 1, nom_centre: 'parilly'},
    {id_centre: 2, nom_centre: 'ribay'},
    {id_centre: 3, nom_centre: 'republique'},
    {id_centre: 4, nom_centre: 'lafayette'},
    {id_centre: 5, nom_centre: 'mermoz'},
    {id_centre: 6, nom_centre: 'velizy'},
    {id_centre: 7, nom_centre: 'sablons'},
  ]);
};
