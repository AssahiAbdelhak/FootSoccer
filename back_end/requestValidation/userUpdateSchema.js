import joi from 'joi'


export const userUpdateSchema = joi.object({
    num_tel: joi.string().min(10).max(10).optional().min(0),
    email: joi.string().case('lower').optional().min(0),
    mot_de_passe: joi.string().optional().min(0)
})