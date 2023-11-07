import joi from 'joi'


export const userUpdateSchema = joi.object({
    num_tel: joi.string().min(10).max(10).optional().min(0),
    email: joi.string().case('lower').optional().min(0),
    nom_complet: joi.string().optional().min(0),
    niveau: joi.string().optional().min(0),
    date_naiss: joi.date().optional().min(0)
})