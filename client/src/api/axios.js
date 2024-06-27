import axios from "axios";

//crea el dominio base a donde solicita las peticiones
const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export default instance