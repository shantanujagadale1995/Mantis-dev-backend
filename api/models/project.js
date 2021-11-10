const mongoose = require('mongoose');
const { Schema, model} = require("mongoose");

const schema = mongoose.Schema;

const projectSchema = new schema({

    projectName: { type: String, require: true },
    orgId: { type: Schema.Types.ObjectId, require: true , ref: 'org' },
    description: { type: String, require: true },
    ownerName: { type: String, require: true },
    ownerMail: { type: String, require: true },

}, { timestamps: true });

// exports.projectModel = mongoose.model('projectModel', projectSchema, 'project');

module.exports = mongoose.model('projectModel', projectSchema, 'project')
