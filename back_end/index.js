import Fastify from 'fastify'
import fastifyCors from '@fastify/cors';
import { fastifyExpress } from '@fastify/express';
import { addCentreTodb, deleteCentreTodb, getAllCentres, getCentre, updateCentreTodb } from './controllers/centreController.js';
import { addTerrainTodb, deleteTerrainTodb, getAllTerrains, getAllTerrainsCount, getTerrain, updateTerrainTodb } from './controllers/terrainController.js';
import { addUserTodb, deleteUserTodb, getAllUsers, getAllUsersCount, getUser, updatePassword, updateUserInformation, updateUserTodb, userExiste, verifyUser } from './controllers/userController.js';
import { signIn } from './controllers/authController.js';
import {authenticate, authenticateAsUser,decodejwt} from './auth/auth.js';
import { addJoueursReserves, addTerrainsReserves, getAllJoueursReserves, getAllTerrainsReserves, getReservationInfos } from './controllers/reservationController.js';
import { sendSMS, sendWhatsappMessage } from './utils/fonctions.js';


export const app = Fastify();
await app.register(fastifyExpress)
await app.register(fastifyCors,{
    origin :'*'
})
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*route pour la table centres*/ 
app.get('/centres',getAllCentres)
app.get('/centres/:id',getCentre)
app.patch('/centres/:id',{preHandler : authenticate},updateCentreTodb)
app.delete('/centres/:id',{preHandler : authenticate},deleteCentreTodb)
app.post('/centres',{preHandler : authenticate},addCentreTodb)

/*route pour la table terrains*/ 
app.get('/terrains',getAllTerrains)
app.get('/terrains/count',getAllTerrainsCount)
app.get('/terrains/:id',getTerrain)
app.patch('/terrains/:id',{preHandler : authenticate},updateTerrainTodb)
app.delete('/terrains/:id',{preHandler : authenticate},deleteTerrainTodb)
app.post('/terrains',{preHandler : authenticate},addTerrainTodb)

/*route pour la table utilisateurs*/ 
/** pour simlifier admin est l'utilisateur avec l'id 1 */
app.get('/users',getAllUsers)
app.get('/users/count',getAllUsersCount)
app.get('/user/:id',userExiste)
app.get('/users/:id',{preHandler : authenticate},getUser)
app.patch('/users/:id', { preHandler: authenticate },updateUserTodb)
//app.patch('/users/:id', { preHandler: authenticate },updateUserInformation)
app.delete('/users/:id',{preHandler : authenticateAsUser},deleteUserTodb)
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