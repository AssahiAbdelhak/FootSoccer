import joi from 'joi'


export const userUpdateSchema = joi.object({
    num_tel: joi.string().min(10).max(10).optional(),
    email: joi.string().case('lower').optional(),
    mot_de_passe: joi.string().optional().min(0)
})