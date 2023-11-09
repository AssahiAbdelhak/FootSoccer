
import dayjs from "dayjs";
import { db } from "../dataBase/db.js"
import { sendData } from "../utils/fonctions.js";

export const getAllTerrainsReserves = async (req,res) => {
    let obj = {
        id_centre : req.params.id,
        date : req.query.date ? req.query.date : ''
    }
    let attributes = req.query.filter ? req.query.filter.split(',') : '*'
    if(obj.date == '')
        delete obj.date
    let elemToDelete = await db('resa_terrain').where('date', '<', dayjs().format('YYYY-MM-DD')).select('id_resa')
    for(let i = 0 ; i < elemToDelete.length ; i++){
        await db('resa_utilisateurs').where('id_resa', '=', elemToDelete[i].id_resa).delete()
    }
    await db('resa_terrain').where('date', '<', dayjs().format('YYYY-MM-DD')).delete()
    elemToDelete = await db('resa_terrain').where('date', '=', dayjs().format('YYYY-MM-DD')).andWhere('debut','<',dayjs().format('HH')).select('id_resa')
    for(let i = 0 ; i < elemToDelete.length ; i++){
        await db('resa_utilisateurs').where('id_resa', '=', elemToDelete[i].id_resa).delete()
    }
    await db('resa_terrain').where('date', '=', dayjs().format('YYYY-MM-DD')).andWhere('debut','<',dayjs().format('HH')).delete()
    let elems = await db('resa_terrain').select(...attributes).where(obj);
    return sendData(res,200,elems)
}
export const getReservationInfos = async (req,res) => {
    let elem = await db('resa_terrain').select('*').where({
        id_resa : req.params.id
    }).first();
    return sendData(res,200,elem)
}
export const addTerrainsReserves = async (req,res) => {
    try{
        let elems = await db('resa_terrain').insert({
        id_centre : req.body.id_centre,
        date: req.body.date,
        debut: req.body.debut,
        }).returning('id_resa');
        res.status(200).send({
            success : true,
            id_resa: elems[0].id_resa
        })
    }catch(e){
        console.log(e)
    }
}

const deletePassedReser = async () => {
    let elemToDelete = await db('resa_terrain').where('date', '<', dayjs().format('YYYY-MM-DD')).select('id_resa')
    for(let i = 0 ; i < elemToDelete.length ; i++){
        await db('resa_utilisateurs').where('id_resa', '=', elemToDelete[i].id_resa).delete()
    }
    await db('resa_terrain').where('date', '<', dayjs().format('YYYY-MM-DD')).delete()
    elemToDelete = await db('resa_terrain').where('date', '=', dayjs().format('YYYY-MM-DD')).andWhere('debut','<',dayjs().format('HH')).select('id_resa')
    for(let i = 0 ; i < elemToDelete.length ; i++){
        await db('resa_utilisateurs').where('id_resa', '=', elemToDelete[i].id_resa).delete()
    }
    await db('resa_terrain').where('date', '=', dayjs().format('YYYY-MM-DD')).andWhere('debut','<',dayjs().format('HH')).delete()
}

export const getAllJoueursReserves = async (req,res) => {
    deletePassedReser()

    let elems = await db('resa_utilisateurs').join('resa_terrain', 'resa_utilisateurs.id_resa', '=','resa_terrain.id_resa').select('*').where({
        id_utilisateur : req.params.id
    });
    return sendData(res,200,elems)
}
export const addJoueursReserves = async (req,res) => {
    await db('resa_utilisateurs').insert({
        id_resa: req.body.id_resa,
        id_utilisateur: req.body.id_utilisateur
    });
    res.status(200).send({
        success : true
    })
}