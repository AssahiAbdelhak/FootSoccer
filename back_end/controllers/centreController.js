import { db } from "../dataBase/db.js"
import { addCentreSchema } from "../requestValidation/centreSchema.js"
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'

const pump = util.promisify(pipeline)

export const getAllCentres = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let attributes = req.query.filter ? req.query.filter.split(',') : '*'
    let elems = await db('centres').select(...attributes);
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}


export const getCentre = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let attributes = req.query.filter ? req.query.filter.split(',') : '*'
    let elem = await db('centres').select(...attributes).where('id_centre','=',req.params.id);
    res.status(200).send({
        success : true,
        data : elem
    })
}

export const addCentreTodb = async (req,res) => {
    console.log('adding centre ...')
    const file = await req.file()
    await pump(file.file, fs.createWriteStream(`./public/uploads/${file.filename}`))
    
    let object ={}
    Object.keys(file.fields).forEach((key) => {
        object[key] = file.fields[key].value
    })
    object.image = 'uploads/'+file.fields.image.filename 
    console.log(file.fields)
    const {value,error} =  addCentreSchema.validate(object)
    if(!error){
        console.log(value)
        try{
            await db("centres").insert({
                nom_centre : value.nom_centre,
                adr_centre : value.adr_centre,
                nb_terrains : value.nb_terrains,
                tarif : value.tarif,
                image : value.image
            })
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
        console.log(error)
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
    let elem = await db('centres').select('nom_centre','tarif','adr_centre','nb_terrains').where('id_centre','=',req.params.id);
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
            res.status(400).send({
                success : false,
                message : 'une erreur s\'est produite'
            })
        }
    }else{
        res.status(400).send(
            {
                success : false,
                message : 'donnees invalides'
            })
    }
}