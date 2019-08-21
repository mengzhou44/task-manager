import axios from "axios";
 
const baseURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/api`;
 
const instance = axios.create({
    baseURL
});

export default instance;
