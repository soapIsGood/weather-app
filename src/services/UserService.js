import $api from "../axios/axios";

export default class UserService {
    static fetchUsers() {
        return $api.get('/users')
    }
};