import axios from 'axios'

export default class MyAxios {
    static axios = axios.create({
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
            }
    })

}