const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({

    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profileImage: { type: String },
    role: { type: String, require: true }

}, { timestamps: true });

exports.userModel  = mongoose.model('userModel', userSchema, 'users');