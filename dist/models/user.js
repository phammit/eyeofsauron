"use strict";
//models for mongodb
//using https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial as a guide
Object.defineProperty(exports, "__esModule", { value: true });
//class implementations
class User {
    constructor(email, phone, LNChannel, password, id) {
        this.email = email;
        this.phone = phone;
        this.LNChannel = LNChannel;
        this.password = password;
        this.id = id;
    }
}
exports.default = User;
