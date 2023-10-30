/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('resa_terrain').del()
    await knex('resa_terrain').insert([
      {id_terrain : 1,date : '2023-11-12',debut: '15',duree : 1},
      {id_terrain : 2,date : '2023-11-12',debut: '18',duree : 1},
      {id_terrain : 12,date : '2023-11-12',debut: '16',duree : 1},
      {id_terrain : 3,date : '2023-11-12',debut: '16',duree : 1},
      {id_terrain : 7,date : '2023-11-12',debut: '18',duree : 1},
      {id_terrain : 12,date : '2023-12-14',debut: '17',duree : 1},
      {id_terrain : 11,date : '2023-11-12',debut: '18',duree : 1},
      {id_terrain : 1,date : '2023-10-13',debut: '16',duree : 1},
      {id_terrain : 12,date : '2023-12-13',debut: '18',duree : 1},
      {id_terrain : 3,date : '2023-10-13',debut: '15',duree : 1},
      {id_terrain : 10,date : '2023-10-13',debut: '16',duree : 1},
      {id_terrain : 8,date : '2023-10-13',debut: '18',duree : 1},
      {id_terrain : 12,date : '2023-10-13',debut: '17',duree : 1},
      {id_terrain : 5,date : '2023-10-13',debut: '18',duree : 1},
      {id_terrain : 1,date : '2023-11-12',debut: '16',duree : 1},
      {id_terrain : 12,date : '2023-11-12',debut: '18',duree : 1},
      {id_terrain : 12,date : '2023-09-12',debut: '16',duree : 1},
      {id_terrain : 7,date : '2023-11-12',debut: '16',duree : 1},
      {id_terrain : 5,date : '2023-11-12',debut: '15',duree : 1},
      {id_terrain : 12,date : '2023-12-12',debut: '17',duree : 1},
      {id_terrain : 10,date : '2023-09-12',debut: '18',duree : 1},
      {id_terrain : 1,date : '2023-10-13',debut: '15',duree : 1},
      {id_terrain : 2,date : '2023-11-13',debut: '18',duree : 1},
      {id_terrain : 12,date : '2023-10-13',debut: '16',duree : 1},
      {id_terrain : 6,date : '2023-10-13',debut: '18',duree : 1},
      {id_terrain : 9,date : '2023-10-13',debut: '18',duree : 1},
      {id_terrain : 12,date : '2023-10-13',debut: '18',duree : 1},
      {id_terrain : 7,date : '2023-10-13',debut: '15',duree : 1},
      
    ]);
  };
  