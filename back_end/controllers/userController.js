import argons2, { hash } from 'argon2'
import { db } from "../dataBase/db.js"
import { userSchema } from "../requestValidation/userSchema.js";
import { userUpdateSchema } from '../requestValidation/userUpdateSchema.js';


export const getAllUsers = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elems = await db('utilisateurs').select('*');
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}
export const updatePassword = async (req,res) => {
    console.log('params',req.params)
    console.log('body',req.body)
    res.header("Access-Control-Allow-Origin", "*");
    await db('utilisateurs').where('id_utilisateur', '=',req.params.id).update({
        mot_de_passe : await argons2.hash(req.body.mot_de_passe)
    });
    res.status(200).send({
        success : true,
        message : "mot de passe mis à jour"
    })
}
export const getAllUsersCount = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elems = await db('utilisateurs').select('*');
    res.status(200).send({
        success : true,
        length : elems.length
    })
}
export const userExiste = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elems = await db('utilisateurs').select('*').where('id_utilisateur','=',req.params.id);
    console.log(elems)
    if(elems.length != 0){
        res.status(200).send({
            success: true
        })
    }else{
        res.status(400).send({
            success: false
        })
    }
    
}

export const getUser = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elem = await db('utilisateurs').select('*').where('id_utilisateur','=',req.params.id);
    res.status(200).send({
        success : true,
        data : elem
    })
}

export const addUserTodb = async (req,res) => {
    console.log('pass 1')
    res.header("Access-Control-Allow-Origin", "*");
    console.log('pass')
    const {value,error} =  userSchema.validate(req.body)
    if(!error && value?.mot_de_passe != null){
        console.log('here 2')
        try{
            let hash = await argons2.hash(value.mot_de_passe)
            value.mot_de_passe = hash
            console.log(value)
            let id_user = (await db("utilisateurs").insert(value).returning('id_utilisateur'))[0].id_utilisateur
            console.log(id_user)
            res.status(201).send({
                success : true,
                message : 'l\'element est ajouté',
                id_user 
            })
        }catch(err){
            console.log(err)
            res.status(400).send({
                success : false,
                message : 'une erreur s\'est produite'
            })
        }
    }else{
        console.log(error)
        console.log('here 400')
        res.status(400).send(
            {
                success : false,
                message : 'donnees incompletes ou invalides'
            })
    }
}
export const verifyUser = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try{
        console.log(req.params)
        await db('utilisateurs').where('id_utilisateur', '=', req.params.id).update({
            isVerified: true
        })
        res.send({
            success: true,
            message: 'account verified'
        })
    }catch(e){
        console.log(e)
        res.send({
            success : false,
            message : 'an error accured'
        })
    }
    

}

export const deleteUserTodb = async (req,res) => {
    try{
        let elem = await db('utilisateurs').select('*').where('id_utilisateur','=',req.params.id);
        if(elem.length == 0)
            return res.status(400).send({
                success : false,
                message : `l'element avec l'id ${req.params.id} n'existe pas`
            })
        await db('terrains').delete().where('id_utilisateur','=',req.params.id);
        res.status(204).send({
            success : true,
            message : 'l\'element est supprime'
        })
    }catch(e){
        res.status(400).send({
            success : false,
            message : `une erreur s'est produite`
        })
    }
}

export const updateUserTodb = async (req,res) => {
    console.log('hello from update function')
    let elem = await db('utilisateurs').select('num_tel','email','mot_de_passe').where('id_utilisateur','=',req.params.id);
    let newObject = {
        ...elem[0],
        ...req.body
    }
    let {value,error} =  userUpdateSchema.validate(newObject)
    
    if(!error){
        console.log('no errors')
        try{
            
            if (req.body.mot_de_passe != '') {
                value = {
                    ...value,
                    mot_de_passe: await hash(req.body.mot_de_passe,'secretsecret') 
                }
            }else{
                delete value.mot_de_passe
            }
            console.log(value)
            console.log('update user')
            await db("utilisateurs")
            .where('id_utilisateur','=',req.params.id)
            .update(value)
            res.status(201).send({
                success : true,
                message : 'l\'element est modifié'
            })
        }catch(err){
            console.log(err)
            res.status(400).send({
                success : false,
                message : 'une erreur s\'est produite'
            })
        }
    }else{
        console.log(error)
        res.status(400).send(
            {
                success : false,
                message : 'donnees invalides'
            })
    }
}