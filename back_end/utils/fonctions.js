import twilio from 'twilio'
import dotenv from 'dotenv'
import emailjs from '@emailjs/browser'

dotenv.config({path: '../.env'})

export const sendSMS = async (req,res) => {
    const client = new twilio(process.env.ACCOUNTSID,process.env.AUTHTOKEN);
    try{
        const message = await client.messages.create({
            body : req.body.message,
            from : process.env.PHONENUMBER,
            to: req.body.destinataire
        })
        console.log(message, "message sent")
    }catch(e){
        console.log(e,"error")
    }
}

export const sendWhatsappMessage = async (req,res) => {
    const client = new twilio(process.env.ACCOUNTSID,process.env.AUTHTOKEN);
    try{
        const message = await client.messages.create({
            body : req.body.message,
            from : 'whatsapp:+14155238886',
            to: 'whatsapp:'+req.body.destinataire
        })
        console.log(message, "message sent")
    }catch(e){
        console.log(e,"error")
    }
}

export const sendErrorResponse = (res,statusCode,message) => {
    return res.status(statusCode).send({
        success : false,
        message
    })
}
export const sendData = (res,statusCode,data) => {
    return res.status(statusCode).send({
        success : true,
        length : data.length,
        data
    })
}