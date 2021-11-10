const mongoose = require('mongoose');

const schema = mongoose.Schema;

const orgSchema = new schema({

    orgName: { type: String, require: true },
    description: { type: String, require: true },
    ownerName: { type: String, require: true },
    ownerMail: { type: String, require: true, unique: true }, 
    
}, { timestamps: true });

exports.orgModel = mongoose.model('orgModel', orgSchema , 'org');