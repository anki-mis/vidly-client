import http from './httpService';
import config from '../config.json';

export function getGenres() {
    return http.get(config.apiUrl + '/genres');
  }
  
//export default {getGenres1};