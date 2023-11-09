import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path : '../../.env'})

const verifyToken = (token) => {
    if(token == null)
        return false;
    let decoded = jwt.verify(token,process.env.SECRET)
    return decoded
}

export function decodejwt(req,res) {
    const token = req.headers['authorization'].split(' ')[1]
    if (token == null)
        return false;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err){
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
}

export function authenticate(request,response,done){   
    try{
        let res = verifyToken(request.headers['authorization'].split(' ')[1])
        //console.log('res : ', res)
        if (res == false) {
            return response.status(401).send({ message: "Vous n'etes pas autorise" })
        } else {
            done()
        }
    }catch(e){
        return response.status(498).send({
            status: false,
            message: 'le token fourni est invalid'
        })
    }
    
}

export function adminAuthentication(request,response,done) { 
    
    let res = verifyToken(request.headers['authorization'].split(' ')[1])

    if(res == false || res.role != 'admin'){
        return response.status(401).send({message : "Vous n'etes pas autorise"})
    }else if(res instanceof Error){
        return response.status(498).send({
            status : false,
            message : 'le token fourni est invalid'
        })
    }else {
        done()
    }
    
}