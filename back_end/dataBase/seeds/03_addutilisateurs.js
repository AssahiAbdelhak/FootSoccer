/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('utilisateurs').del()
  await knex('utilisateurs').insert([
    {id_utilisateur: 1, nom_complet: 'nomPrenom',niveau:'intermidiaire',matchs_joues : 2,date_naiss : '2019-10-03',num_tel : '0606060606',mot_de_passe : "hdhcbdhssd",email: 'test@gmail.com'},
    {id_utilisateur: 2, nom_complet: 'hello',niveau:'confirme',matchs_joues : 0,date_naiss : '2019-10-03',num_tel : '0505050505',mot_de_passe : "hdhcbdhssd",email: 'test2@gmail.com'},
    {id_utilisateur: 3, nom_complet: 'anir',niveau:'debutant',matchs_joues : 5,date_naiss : '2019-10-03',num_tel : '0303030303',mot_de_passe : "hdhcbdhssd",email: 'test3@gmail.com'},
    
  ]);
};
