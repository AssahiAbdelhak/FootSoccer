import twilio from 'twilio'
import dotenv from 'dotenv'

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
            from : 'whatsapp:+33605855334',
            to: 'whatsapp:'+req.body.destinataire
        })
        console.log(message, "message sent")
    }catch(e){
        console.log(e,"error")
    }
}