import Fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import Multipart from '@fastify/multipart';
import path from 'path'
import { fileURLToPath } from 'url';
import { fastifyExpress } from '@fastify/express';
import { fastifyStatic } from '@fastify/static';
import argons2 from 'argon2';
import multer from 'multer';
import { addCentreTodb, deleteCentreTodb, getAllCentres, getCentre, updateCentreTodb } from './controllers/centreController.js';
import { addUserTodb, deleteUserTodb, getAllUsers, getUser, updatePassword, updateUserTodb, verifyUser } from './controllers/userController.js';
import { signIn } from './controllers/authController.js';
import {authenticate, adminAuthentication,decodejwt} from './auth/auth.js';
import { addJoueursReserves, addTerrainsReserves, getAllJoueursReserves, getAllTerrainsReserves, getReservationInfos } from './controllers/reservationController.js';
import { sendSMS, sendWhatsappMessage } from './utils/fonctions.js';

const upload = multer({dest : 'uploads/'})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = Fastify();
await app.register(fastifyExpress)
app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  })
await app.register(Multipart)
await app.register(fastifyCors,{
    origin :'*'
})
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*route pour la table centres*/ 
app.get('/centres',getAllCentres)
app.get('/centres/:id',getCentre)
app.patch('/centres/:id',{preHandler : adminAuthentication},updateCentreTodb)
app.delete('/centres/:id',{preHandler : adminAuthentication},deleteCentreTodb)
app.post('/centres',{preHandler : adminAuthentication},addCentreTodb)
//app.post('/centres',addCentreTodb)


/*route pour la table utilisateurs*/ 
/** pour simlifier admin est l'utilisateur avec l'id 1 */
app.get('/users',getAllUsers)
app.get('/users/:id',getUser)
app.patch('/users/:id', { preHandler: authenticate },updateUserTodb)
app.delete('/users/:id',{preHandler : authenticate},deleteUserTodb)
app.post('/users',addUserTodb) 
app.post('/users/verifyCompte/:id',verifyUser) 

/** route pour l'authentification */
app.post('/login',signIn)
app.post('/secure/updatePassword/:id',updatePassword)
app.get('/decode_jwt', decodejwt)

app.get('/reservation/:id', getReservationInfos)

/**route pour les tables de la reservation */
app.get('/reservation/terrain/:id', getAllTerrainsReserves)
app.post('/reservation/terrain', addTerrainsReserves)
app.get('/reservation/joueur/:id', getAllJoueursReserves)
app.post('/reservation/joueur', addJoueursReserves)

/** route pour l'envoi des sms */
app.post("/send/sms",sendSMS)
app.post("/send/whatsapp",sendWhatsappMessage)

app.listen({port: 8080},(err) => {
    if(err) throw err
    else console.log('server launched')
})