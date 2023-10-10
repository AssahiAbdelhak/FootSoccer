import joi from 'joi'


export const userSchema = joi.object({
    nom_complet : joi.string().required(),
    niveau : joi.string().required(),
    matchs_joues : joi.number().integer().positive().allow(0),
    date_naiss : joi.date().required(),
    total_notes : joi.number().integer().positive().allow(0),
    nb_notes : joi.number().integer().positive().allow(0),
    num_tel : joi.string().required().min(10).max(10),
    email : joi.string().required().case('lower'),
    mot_de_passe: joi.string()
})