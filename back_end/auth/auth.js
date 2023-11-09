import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path : '../../.env'})

const verifyToken = (token) => {
    if(token == null)
        return false;
    console.log(process.env.SECRET)
    console.log(token)
    let decoded = jwt.verify(token,process.env.SECRET)
    console.log("decoded from verify token function  ",decoded)
    return decoded
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
        console.log('token ',request.headers['authorization'].split(' ')[1])
        let res = verifyToken(request.headers['authorization'].split(' ')[1])
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
        console.log('token is good')
        done()
    }
    
}