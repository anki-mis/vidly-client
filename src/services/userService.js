import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/users';

export function register(userInfo) {
    // sending this http request to the server, then return the promise
    return http.post(apiEndpoint, {
        email: userInfo.username,
        password: userInfo.password,
        name: userInfo.name
    });
}