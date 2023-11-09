/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('utilisateurs').del();
    await knex('utilisateurs').insert([
      {isVerified : true,nom_complet : 'adminadmin',niveau:'confirmé',role:'admin',date_naiss:'2003-10-31',num_tel:'0601283539',email:'admin@admin.com',mot_de_passe :'$argon2id$v=19$m=65536,t=3,p=4$ILVD6F3k1TGk/Vno4VPMhg$b4ekzQciqR3ZXD9Apyl8BflY4kf+jTwiTGtMWhU582E'},
    ]);
  };
  