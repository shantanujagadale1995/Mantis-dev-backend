const mongoose = require('mongoose');

const schema = mongoose.Schema;

const clusterFileSchema = new schema({

    clusterFile: { type: String, require: true },

}, { timestamps: true });

exports.clusterFileModel = mongoose.model('clusterFileModel', clusterFileSchema , 'clusterfile');
