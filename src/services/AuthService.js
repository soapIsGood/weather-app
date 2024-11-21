import $api from "../axios/axios";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', {email, password})
    }

    static async registration(email, password, city, isadmin) {
        return $api.post('/registration', {email, password, city, isadmin}, {withCredentials:true})
    }

    static async logout() {
        return $api.post('/logout')
    }
};