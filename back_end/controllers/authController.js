import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import dotenv from 'dotenv'
import { db } from "../dataBase/db.js"
import { signUpSchema } from "../requestValidation/signUpSchema.js"

dotenv.config('../../.env')

export const signIn = async (req,res) => {
    console.log('sign in function called')
    console.log(req.body)
    let {value,error} = signUpSchema.validate(req.body)
    console.log('value',value)
    console.log(error)
    if(!error && value.password != null){
        console.log("hello")
        //let {mot_de_passe,id_utilisateur,isVerified} = (await db('utilisateurs').select('mot_de_passe','id_utilisateur','isVerified').where('email',"=",value.email))[0];
        let elem = (await db('utilisateurs').select('mot_de_passe','id_utilisateur','isVerified').where('email',"=",value.email))[0];
        
        console.log(elem)
        console.log('here')
        if(elem == undefined){
            console.log('401')
            return res.status(401).send({
                    success : false,
                    message : 'adresse mail ou le mot de passe est incorrecte'
            })
            
        }
        let {mot_de_passe,id_utilisateur,isVerified} = elem
        if(!isVerified){
            return res.status(401).send({
                status : false,
                message : 'email n\'est pas validé'
            })
        }
        console.log(mot_de_passe,id_utilisateur)
        if(await argon2.verify(mot_de_passe,value.password)){
            let token = jwt.sign({id : id_utilisateur},process.env.SECRET,{expiresIn : 10*60})
            console.log('200',token)
            return res.status(200).send({
                status : true,
                token
            })
        }else{
            console.log('401')
            return res.status(401).send({
                    success : false,
                    message : 'adresse mail ou le mot de passe est incorrecte'
            })
        }
    }else{
        console.log(error)
        console.log('400')
        return res.status(400).send({
            success : false,
            message : 'l\'adresse mail doit etre valide, et le mot de passe doit contenir plus de 6 lettres et chiffres'
        })
    }
}