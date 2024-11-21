module.exports = class UserDto {
    email;
    id;
    city;
    isadmin;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.city = model.city;
        this.isadmin = model.isadmin;
    }
}