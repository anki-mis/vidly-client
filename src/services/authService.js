import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey="token";

http.setJwt(getJwt());

async function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
    return localStorage.getItem(tokenKey);
}

export async function login(email, password) {
    const {data:jwt} = await http.post(apiEndpoint, {email, password});
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      }
      catch(e) {
        return null;
      }
}

export default {
    login, logout, getCurrentUser, loginWithJwt, getJwt
};