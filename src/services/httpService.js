import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {
  //console.log('Interceptor Called.');

  if (!(error.response && error.response.status>=400 && error.response.status<500)) {
    console.log('Logging the error - ', error);
    toast.error('An unexpected error occurred.');
  }  

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

//the exported object should have 4 functions just like axios
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};