import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import dotenv from 'dotenv'
import { db } from "../dataBase/db.js"
import { signUpSchema } from "../requestValidation/signUpSchema.js"

dotenv.config('../../.env')

export const signIn = async (req,res) => {
    let {value,error} = signUpSchema.validate(req.body)
    if(!error && value.password != null){
        let elem = await db('utilisateurs').select('*').where('email',"=",value.email).first();
        
        if(elem == undefined){
            return res.status(401).send({
                    success : false,
                    message : 'adresse mail ou le mot de passe est incorrecte'
            })
            
        }
        let {mot_de_passe,id_utilisateur,isVerified,role} = elem
        if(!isVerified){
            return res.status(401).send({
                status : false,
                message : 'email n\'est pas validé'
            })
        }
        if(await argon2.verify(mot_de_passe,value.password)){
            let token = jwt.sign({id : id_utilisateur,role},process.env.SECRET,{expiresIn : 60*60*50})
            return res.status(200).send({
                status : true,
                token,
                elem
            })
        }else{
            return res.status(401).send({
                    success : false,
                    message : 'adresse mail ou le mot de passe est incorrecte'
            })
        }
    }else{
        return res.status(400).send({
            success : false,
            message : 'l\'adresse mail doit etre valide, et le mot de passe doit contenir plus de 6 lettres et chiffres'
        })
    }
}