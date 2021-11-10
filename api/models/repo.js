const mongoose = require('mongoose');
const { Schema, model} = require("mongoose");

const schema = mongoose.Schema;

const repoSchema = new schema({

    provider: { type: String, require: true },
    connectionType: { type: String, require: true },
    repoUrl: { type: String, require: true },
    username: { type: String, require: true },
    personalAccessToken: { type: String, require: true },

}, { timestamps: true });

module.exports = mongoose.model('repoModel', repoSchema, 'repo')