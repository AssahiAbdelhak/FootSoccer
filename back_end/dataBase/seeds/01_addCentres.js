/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('resa_terrain').del()
  await knex('centres').del()
  await knex('centres').insert([
    {id_centre: 1,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:7, nom_centre: 'parilly'},
    {id_centre: 2,nb_terrains:2,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:8, nom_centre: 'ribay'},
    {id_centre: 3,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:5.2, nom_centre: 'republique'},
    {id_centre: 4,nb_terrains:5,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:7.3, nom_centre: 'lafayette'},
    {id_centre: 5,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:9, nom_centre: 'mermoz'},
    {id_centre: 6,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:17, nom_centre: 'velizy'},
    {id_centre: 7,nb_terrains:3,adr_centre:"11 rue des sport 69200 vénissieux, France",tarif:7, nom_centre: 'sablons'},
  ]);
};
