import isEmpty from 'lodash/isEmpty.js';


/**
 * fonction permettant de créer une instance de requête pour axios
 * @param {*} param0 
 * @returns 
 */
export function createApiRequestInstance({
    path, method, headers = {}, data, params,
  }) {
    const token = localStorage.getItem('token');
  
    const apiHeaders = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
    console.log(data)
    const requestInstance = {
      method,
      url: path,
      params,
      baseURL: import.meta.env.VITE_API_URL,
      headers: apiHeaders,
    };
  
    if (isEmpty(path) || isEmpty(method)) { 
      console.log('something is empty')
      return {};
     }
  
    if (!isEmpty(data)) {
      console.log('data is not empty')
      return {
        ...requestInstance,
        data
      };
    }
    console.log('data is empty')
    return {
      ...requestInstance,
      data
    };
  }