const {Schema, model} = require('mongoose');
const tokenService = require("../services/token.service");

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, default: 18},
    email: {type: String, trim: true, lowercase: true, required: true, unique: true},
    password: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('user', userSchema);

userSchema.statics = {
    async createUserWithHashPassword(userObject = {}) {
        const hashPassword = await tokenService.hashPassword(userObject.password)
        return this.create({...userObject, password: hashPassword});
    }
};

userSchema.methods = {};