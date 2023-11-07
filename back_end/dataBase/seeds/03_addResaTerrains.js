/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('resa_terrain').del()
    await knex('resa_terrain').insert([
      {id_centre : 1,date : '2023-11-12',debut: '10'},
      {id_centre : 2,date : '2023-11-13',debut: '13'},
      {id_centre : 4,date : '2023-11-12',debut: '16'},
      {id_centre : 1,date : '2023-11-12',debut: '16'},
      {id_centre : 7,date : '2023-11-12',debut: '18'},
      {id_centre : 1,date : '2023-12-14',debut: '17'},
      {id_centre : 6,date : '2023-11-15',debut: '15'},
      {id_centre : 6,date : '2023-12-13',debut: '14'},      
      {id_centre : 1,date : '2023-11-12',debut: '11'},
      {id_centre : 3,date : '2023-11-13',debut: '19'},
      {id_centre : 1,date : '2023-11-12',debut: '18'},
      {id_centre : 5,date : '2023-11-14',debut: '15'},
      {id_centre : 2,date : '2023-12-12',debut: '20'},
      {id_centre : 2,date : '2023-11-13',debut: '18'},
      
      
    ]);
  };
  