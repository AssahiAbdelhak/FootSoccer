import argons2 from 'argon2'
import { db } from "../dataBase/db.js"
import { userSchema } from "../requestValidation/userSchema.js";


export const getAllUsers = async (req,res) => {
    let elems = await db('utilisateurs').select('*');
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}

export const getUser = async (req,res) => {
    let elem = await db('utilisateurs').select('*').where('id_utilisateur','=',req.params.id);
    res.status(200).send({
        success : true,
        data : elem
    })
}

export const addUserTodb = async (req,res) => {
    const {value,error} =  userSchema.validate(req.body)
    
    if(!error && value.mot_de_passe != null){

        try{
            let hash = await argons2.hash(value.mot_de_passe)
            value.mot_de_passe = hash
            console.log(value)
            await db("utilisateurs").insert(value)
            res.status(201).send({
                success : true,
                message : 'l\'element est ajouté'
            })
        }catch(err){
            console.log(err)
            res.status(400).send({
                success : false,
                message : 'une erreur s\'est produite'
            })
        }
    }else{
        res.status(400).send(
            {
                success : false,
                message : 'donnees incompletes ou invalides'
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
    let elem = await db('utilisateurs').select('nom_complet','niveau','matchs_joues','total_notes','nb_notes','num_tel','email','date_naiss').where('id_utilisateur','=',req.params.id);
    let newObject = {
        ...elem[0],
        ...req.body
    }
    const {value,error} =  userSchema.validate(newObject)
    if(!error){
        try{
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