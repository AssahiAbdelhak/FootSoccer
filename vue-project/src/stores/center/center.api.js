import axios from "axios";
import * as api from '../api.js';
import get from 'lodash/get.js';


/**
 * Avec l'instance de requête créée dans `api.js` on effectue un appel api sur la route /centres
 * pour récupérer tous nos centres
 * @returns 
 */
export async function getCenters(){
    const request = api.createApiRequestInstance({
        path: '/centres',
        method: 'GET',
      });
      const response = await axios(request);
      const centers = get(response, 'data.data');
      return centers;
}

export async function createCenter({center}){
    const request = api.createApiRequestInstance({
        path: '/centres',
        method: 'POST',
        data: center,
      });
      console.log('center : ',center)
      console.log(request)
      const response = await axios(request);
      console.log(response)
      const centers = get(response, 'data.data');
      return centers;
}