import joi from 'joi'

export const addCentreSchema = joi.object({
    nom_centre : joi.string().min(1).case('lower').required(),
    tarif : joi.number().positive(),
})