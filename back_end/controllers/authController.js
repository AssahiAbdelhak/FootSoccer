import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import dotenv from 'dotenv'
import { db } from "../dataBase/db.js"
import { signUpSchema } from "../requestValidation/signUpSchema.js"

dotenv.config()

console.log(process.env.SECRET)

export const signIn = async (req,res) => {
    
    let {value,error} = signUpSchema.validate(req.body)
    console.log(value)
    if(!error && value.password != null){
        let {mot_de_passe,id_utilisateur} = (await db('utilisateurs').select('mot_de_passe','id_utilisateur').where('email',"=",value.email))[0];
        console.log(mot_de_passe,id_utilisateur)
        if(await argon2.verify(mot_de_passe,value.password)){
            let token = jwt.sign({id : id_utilisateur},process.env.SECRET,{expiresIn : 3*60})
            res.status(200).send({
                status : true,
                token
            })
        }else{
            res.status(401).send({
                    success : false,
                    message : 'adresse mail ou le mot de passe est incorrecte'
            })
        }
    }else{
        console.log(error)
        res.status(400).send({
            success : false,
            message : 'l\'adresse mail doit etre valide, et le mot de passe doit contenir plus de 6 lettres et chiffres'
        })
    }
}