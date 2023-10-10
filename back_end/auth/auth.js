import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function verifyToken(token){
    if(token == null)
        return false;
    jwt.verify(token,process.env.SECRET,function (err,decoded){
        if(err)
            return err
        return decoded
    })
}

export function authenticate(request,response,done){   
    let res = verifyToken(request.headers['authorization'])
    if(res==false){
        return response.status(401).send({message : "Vous n'etes pas autorise"})
    }else if(res instanceof Error){
        return response.status(498).send({
            status : false,
            message : 'le token fourni est invalid'
        })
    }else{
        response.status(200).send({
            status : true,
            token : request.headers['authorization'],
            ...decoded
        })
    }
}

export function authenticateAsUser(request,response,done){   
    let res = verifyToken(request.headers['authorization'])
    if(res==false || res.id != request.params.id){
        return response.status(401).send({message : "Vous n'etes pas autorise"})
    }else if(res instanceof Error){
        return response.status(498).send({
            status : false,
            message : 'le token fourni est invalid'
        })
    }else{
        response.status(200).send({
            status : true,
            token : request.headers['authorization'],
            ...decoded
        })
    }
}