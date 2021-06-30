import axios from "axios";

const http = axios.create({
    baseURL: 'https://imersao-nestjs.herokuapp.com'
})

export default http;