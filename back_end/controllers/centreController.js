
import { db } from "../dataBase/db.js"
import { addCentreSchema } from "../requestValidation/centreSchema.js"

export const getAllCentres = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elems = await db('centres').select('*');
    console.log(elems.length)
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}


export const getCentre = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elem = await db('centres').select('*').where('id_centre','=',req.params.id);
    res.status(200).send({
        success : true,
        data : elem
    })
}

export const addCentreTodb = async (req,res) => {
    const {value,error} =  addCentreSchema.validate(req.body)
    if(!error){
        try{
            await db("centres").insert({
                nom_centre : value.nomCentre,
                tarif : value.tarif
            })
            res.status(201).send({
                success : true,
                message : 'l\'element est ajouté'
            })
        }catch(err){
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

export const deleteCentreTodb = async (req,res) => {
    try{
        let elem = await db('centres').select('*').where('id_centre','=',req.params.id);
        console.log(elem.length)
        if(elem.length == 0)
            return res.status(400).send({
                success : false,
                message : `l'element avec l'id ${req.params.id} n'existe pas`
            })
        await db('centres').delete().where('id_centre','=',req.params.id);
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

export const updateCentreTodb = async (req,res) => {
    let elem = await db('centres').select('nom_centre','tarif').where('id_centre','=',req.params.id);
    let newObject = {
        ...elem[0],
        ...req.body
    }
    const {value,error} =  addCentreSchema.validate(newObject)
    if(!error){
        try{
            await db("centres")
            .where('id_centre','=',req.params.id)
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