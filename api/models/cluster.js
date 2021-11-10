const mongoose = require('mongoose');

const schema = mongoose.Schema;

const clusterSchema = new schema({

    clusterFileId: { type: String, require: true },
    name: { type: String, require: true },
    clusterName: { type: String, require: true },
    clusterServer: { type: String, require: true },
    clusterCertificateData: { type: String, require: true },
    userName: { type: String, require: true },
    userCertificateData: { type: String, require: true },
    userClientKeyData: { type: String, require: true },
    contextName: { type: String, require: true },
    contextUser: { type: String, require: true },
    contextCluster: { type: String, require: true },

}, { timestamps: true });

exports.clusterModel = mongoose.model('clusterModel', clusterSchema, 'cluster');