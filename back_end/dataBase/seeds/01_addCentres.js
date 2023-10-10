/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('terrains').del()
  await knex('centres').del()
  await knex('centres').insert([
    {id_centre: 1, nom_centre: 'parilly',tarif : 8.5},
    {id_centre: 2, nom_centre: 'ribay',tarif : 6},
    {id_centre: 3, nom_centre: 'republique',tarif : 7.5},
    {id_centre: 4, nom_centre: 'lafayette',tarif : 5},
    {id_centre: 5, nom_centre: 'mermoz',tarif : 10},
    {id_centre: 6, nom_centre: 'velizy',tarif : 9},
    {id_centre: 7, nom_centre: 'sablons',tarif : 7},
  ]);
};
