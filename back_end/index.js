import Fastify from 'fastify'
import { addCentreTodb, deleteCentreTodb, getAllCentres, getCentre, updateCentreTodb } from './controllers/centreController.js';
import { addTerrainTodb, deleteTerrainTodb, getAllTerrains, getTerrain, updateTerrainTodb } from './controllers/terrainController.js';
import { addUserTodb, deleteUserTodb, getAllUsers, getUser, updateUserTodb } from './controllers/userController.js';
import { signIn } from './controllers/authController.js';
import {authenticate, authenticateAsUser} from './auth/auth.js';
import { getAllJoueursReserves, getAllTerrainsReserves } from './controllers/reservationController.js';



export const app = Fastify();


/*route pour la table centres*/ 
app.get('/centres',getAllCentres)
app.get('/centres/:id',getCentre)
app.patch('/centres/:id',{preHandler : authenticate},updateCentreTodb)
app.delete('/centres/:id',{preHandler : authenticate},deleteCentreTodb)
app.post('/centres',{preHandler : authenticate},addCentreTodb)

/*route pour la table terrains*/ 
app.get('/terrains',getAllTerrains)
app.get('/terrains/:id',getTerrain)
app.patch('/terrains/:id',{preHandler : authenticate},updateTerrainTodb)
app.delete('/terrains/:id',{preHandler : authenticate},deleteTerrainTodb)
app.post('/terrains',{preHandler : authenticate},addTerrainTodb)

/*route pour la table utilisateurs*/ 
/** pour simlifier admin est l'utilisateur avec l'id 1 */
app.get('/users',{preHandler : authenticate},getAllUsers)
app.get('/users/:id',{preHandler : authenticate},getUser)
app.patch('/users/:id',{preHandler : authenticateAsUser},updateUserTodb)
app.delete('/users/:id',{preHandler : authenticateAsUser},deleteUserTodb)
app.post('/users',addUserTodb)

/** route pour l'authentification */
app.post('/sign-up',signIn)

/**route pour les tables de la reservation */
app.get('/reservation/terrain', getAllTerrainsReserves)
app.get('/reservation/joueur', getAllJoueursReserves)


//app.get('/utilisateurs',{preHandler : authenticate},getAllUsers);

//app.all("*",notFound)

app.listen({port: 8080},(err) => {
    if(err) throw err
    else console.log('server launched')
})