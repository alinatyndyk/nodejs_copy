const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, default: 18},
    email: {type: String, trim: true, lowercase: true, required: true, unique: true}
}, {
    timestamps: true
})

module.exports = model('user', userSchema);