
import { db } from "../dataBase/db.js"

export const getAllTerrainsReserves = async (req,res) => {
    let elems = await db('resa_terrain').select('*');
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}
export const getAllJoueursReserves = async (req,res) => {
    let elems = await db('resa_utilisateurs').select('*');
    res.status(200).send({
        success : true,
        length : elems.length,
        data : elems
    })
}