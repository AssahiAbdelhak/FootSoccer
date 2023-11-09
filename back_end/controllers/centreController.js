import { db } from "../dataBase/db.js"
import { addCentreSchema } from "../requestValidation/centreSchema.js"
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import { sendData, sendErrorResponse } from "../utils/fonctions.js"

const pump = util.promisify(pipeline)

export const getAllCentres = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let attributes = req.query.filter ? req.query.filter.split(',') : '*'
    let elems = await db('centres').select(...attributes);
    return sendData(res,200,elems);
}


export const getCentre = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let attributes = req.query.filter ? req.query.filter.split(',') : '*'
    let elem = await db('centres').select(...attributes).where('id_centre','=',req.params.id);
    return sendData(res,200,elem)
}

export const addCentreTodb = async (req,res) => {
    const file = await req.file()
    await pump(file.file, fs.createWriteStream(`./public/uploads/${file.filename}`))
    
    let object ={}
    Object.keys(file.fields).forEach((key) => {
        object[key] = file.fields[key].value
    })
    object.image = 'uploads/'+file.fields.image.filename 
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
            return sendData(res,201,'l\'element est ajouté')
        }catch(err){
            console.log(err)
            return sendErrorResponse(res,400,'une erreur s\'est produite')
        }
    }else{
        console.log(error)
        return sendErrorResponse(res,400,'donnees incompletes ou invalides')
    }
}

export const deleteCentreTodb = async (req,res) => {
    try{
        let elem = await db('centres').select('*').where('id_centre','=',req.params.id);
        if(elem.length == 0)
            return sendErrorResponse(res,400,`l'element avec l'id ${req.params.id} n'existe pas`)    
        console.log('here')
        await db('resa_terrain').delete().where('id_centre','=',req.params.id)
        await db('centres').delete().where('id_centre','=',req.params.id);
        return sendData(res,204,'l\'element est supprime')
    }catch(e){
        console.log(e)
        return sendErrorResponse(res,400,`une erreur s'est produite`)
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
            console.log(value)
            await db("centres")
            .where('id_centre','=',req.params.id)
            .update(value)
            return sendData(res,201,'l\'element est modifié')
        }catch(err){
            console.log(err)
            return sendErrorResponse(res,400,'une erreur s\'est produite')
        }
    }else{
        console.log(error)
        return sendErrorResponse(res,400,'donnees invalides')
    }
}