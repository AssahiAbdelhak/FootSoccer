import emailjs from '@emailjs/browser'

export const sendEmail = async (templateName,infosObj) => {
    try{
        emailjs.send('service_pmpofgp', templateName, {
            ...infosObj
        }, '2hUGv3c8JztUPCBQN')
            .then((result) => {
                console.log('SUCCESS!', result.text);
            }, (e) => {
                console.log('FAILED...', e);
            });
    }catch(e){
        console.log(e)
    }
}