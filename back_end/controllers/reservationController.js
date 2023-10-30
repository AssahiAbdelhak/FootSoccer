
import dayjs from "dayjs";
import { db } from "../dataBase/db.js"

export const getAllTerrainsReserves = async (req,res) => {
    console.log(req.params)
    let elemToDelete = await db('resa_terrain').where('date', '<', dayjs().format('YYYY-MM-DD')).select('id_resa')
    console.log('done 1')
    console.log(elemToDelete.length)
    for(let i = 0 ; i < elemToDelete.length ; i++){
        console.log(i)
        await db('resa_utilisateurs').where('id_resa', '=', elemToDelete[i].id_resa).delete()
        
    }
    await db('resa_terrain').where('date', '<', dayjs().format('YYYY-MM-DD')).delete()
    let elems = await db('resa_terrain').select('*').where({
        id_resa : req.params.id
    });
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}
export const addTerrainsReserves = async (req,res) => {
    console.log('to this')
    console.log(req.query)
    let elems = await db('resa_terrain').insert({
        id_terrain : req.query.id_terrain,
        date: req.query.date,
        debut: req.query.debut,
        duree: req.query.duree,
    }).returning('id_resa');
    console.log(elems)
    res.status(200).send({
        success : true,
        id_resa: elems[0].id_resa
    })
}
export const getAllJoueursReserves = async (req,res) => {
    let elems = await db('resa_utilisateurs').join('resa_terrain', 'resa_utilisateurs.id_resa', '=','resa_terrain.id_resa').select('*').where({
        id_utilisateur : req.params.id
    });
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}
export const addJoueursReserves = async (req,res) => {
    console.log(req.query)
    await db('resa_utilisateurs').insert({
        id_resa: req.query.id_resa,
        id_utilisateur: req.query.id_utilisateur
    });
    res.status(200).send({
        success : true
    })
}