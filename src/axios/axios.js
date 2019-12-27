import axios from 'axios';
import {authHeader} from '../services/authentication'

const instance = axios.create({
    baseURL: 'http://localhost:44322',
    headers: authHeader()
   
    
});
instance.interceptors.response.use(null, error => {
    const expectedError =
      error.response &&
      error.response.status > 404 &&
      error.response.status < 500;
  
    if (expectedError) {
        console.log("An unexpected error occurrred.");
    }
  
    if (error) {
        console.log(error);
    }
  
    return Promise.reject(error);
  });
export default instance;