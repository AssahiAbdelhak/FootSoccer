
import { db } from "../dataBase/db.js"
import { terrainSchema } from "../requestValidation/terrainSchema.js";

export const getAllTerrains = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {id_centre,date} = req.query
    console.log(req.query)
    let elems
    if(date != null){
    elems = await db('terrains').join("resa_terrain","terrains.id_terrain","resa_terrain.id_terrain").select('terrains.id_terrain','est_filme','localisation','debut').where({
        id_centre,
        date
    })
    }else if(id_centre != null){
        elems = await db('terrains').select('id_terrain','est_filme','localisation').where({
            id_centre
        })
    }else{
        elems = await db('terrains').select('*')
    }

    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}
export const getAllTerrainsCount = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const elems = await db('terrains').select('*')
    
    res.status(200).send({
        success : true,
        length : elems.length
    })
}

export const getTerrain = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let elem = await db('terrains').select('*').where('id_terrain','=',req.params.id);
    res.status(200).send({
        success : true,
        lenght : elem.lenght,
        data : elem
    })
}

export const addTerrainTodb = async (req,res) => {
    const {value,error} =  terrainSchema.validate(req.body)
    if(!error){
        try{
            await db("terrains").insert(value)
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

export const deleteTerrainTodb = async (req,res) => {
    try{
        let elem = await db('terrains').select('*').where('id_terrain','=',req.params.id);
        if(elem.length == 0)
            return res.status(400).send({
                success : false,
                message : `l'element avec l'id ${req.params.id} n'existe pas`
            })
        await db('terrains').delete().where('id_terrain','=',req.params.id);
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

export const updateTerrainTodb = async (req,res) => {
    let elem = await db('terrains').select('est_filme','localisation','id_centre').where('id_terrain','=',req.params.id);
    let newObject = {
        ...elem[0],
        ...req.body
    }
    const date = new Date();
    console.log(Date.now())

    const {value,error} =  terrainSchema.validate(newObject)
    if(!error){
        try{
            await db("terrains")
            .where('id_terrain','=',req.params.id)
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