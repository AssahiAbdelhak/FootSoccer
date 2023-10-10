import joi from "joi";


export const terrainSchema = joi.object({
    id_centre : joi.number().integer().positive().required(),
    est_filme : joi.boolean().required(),
    localisation : joi.string().required()
})