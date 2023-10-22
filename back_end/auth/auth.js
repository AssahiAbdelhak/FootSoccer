import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path : '../../.env'})

function verifyToken(token){
    if(token == null)
        return false;
    jwt.verify(token,process.env.SECRET,function (err,decoded){
        if(err)
            return err
        return decoded
    })
}

export function decodejwt(req,res) {
    console.log(req.headers)
    const token = req.headers['authorization'].split(' ')[1]
    if (token == null)
        return false;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err){
            console.log(err)
            return res.send({
                "success" : false,
                "message": "token non valide ou non fourni"
            })
        }
        return res.send({
            "success": true,
            decoded
        })
    })
    res.send('hello')
}

export function authenticate(request,response,done){   
    try{
        let res = verifyToken(request.headers['authorization'])
        //console.log('res : ', res)
        if (res == false) {
            console.log('vous n\'etez pas autorise')
            return response.status(401).send({ message: "Vous n'etes pas autorise" })
        } else {
            console.log('done')
            done()
        }
    }catch(e){
        console.log('here ')
        return response.status(498).send({
            status: false,
            message: 'le token fourni est invalid'
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