import joi from 'joi'

export const addCentreSchema = joi.object({
    nom_centre : joi.string().min(1).required(),
    adr_centre : joi.string().min(1).required(),
    image : joi.string().min(1).optional(),
    nb_terrains : joi.number().optional().default(1),
    tarif : joi.number().positive(),
})