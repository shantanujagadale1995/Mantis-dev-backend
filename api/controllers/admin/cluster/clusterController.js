const clusterFileModel = require('../../../models/clusterFile');
const clusterModel = require('../../../models/cluster');

const clusterController = {

    async createCluster(req, res, next) {

        const clusterFile = req.body.clusterConfigFile;
        const clusterDetails = req.body.details;

        try {
            const data = new clusterFileModel.clusterFileModel({ clusterFile });
            let clusterFileResult = await data.save();

            let result

            $: clusterresult = await clusterDetails.forEach(element => {
                let {
                    name,
                    clusterName,
                    clusterServer,
                    clusterCertificateData,
                    userName,
                    userCertificateData,
                    userClientKeyData,
                    contextName,
                    contextUser,
                    contextCluster
                } = element;

                let data = new clusterModel.clusterModel({
                    clusterFileId: clusterFileResult._id,
                    name,
                    clusterName,
                    clusterServer,
                    clusterCertificateData,
                    userName,
                    userCertificateData,
                    userClientKeyData,
                    contextName,
                    contextUser,
                    contextCluster
                });
                try {
                    result = data.save();

                } catch (error) {
                    return next(error)
                }
            });

            let response;
            if (result) {
                response = {
                    message: 'Cluster created sucessfully.',
                    statusCode: 200,
                    data: result
                };
            } else {
                response = {
                    message: 'Something went wrong.',
                    statusCode: 500,
                    data: result
                };
            }
            res.status(response.statusCode).json(response);

        } catch (error) {
            return next(error);
        }
    },

    async getClusterList(req, res, next) {

        try {
            const result = await clusterModel.clusterModel.find({}).select('-createdAt -updatedAt -__v');

            if (result) {
                let response = {
                    message: 'Cluster list get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Cluster not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async getDetails(req, res, next) {

        const { id } = req.params;

        try {
            const result = await clusterModel.clusterModel.findOne({ _id: id });

            if (result) {
                let response = {
                    message: 'Cluster details get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Cluster not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async deleteCluster(req, res, next) {

        const { id } = req.params;

        try {
            const result = await clusterModel.clusterModel.deleteOne({ _id: id });

            console.log(result);

            if (result) {
                let response = {
                    message: 'Cluster Deleted sucessfully.'
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Cluster not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async updateCluster(req, res, next) {

        const {
            _id,
            name,
            clusterName,
            clusterServer,
            clusterCertificateData,
            userName,
            userCertificateData,
            userClientKeyData,
            contextName,
            contextUser,
            contextCluster } = req.body;

        try {

            const result = await clusterModel.clusterModel.findOneAndUpdate({ _id }, {
                name,
                clusterName,
                clusterServer,
                clusterCertificateData,
                userName,
                userCertificateData,
                userClientKeyData,
                contextName,
                contextUser,
                contextCluster
            }, { new: true, runValidators: true });


            if (!result) {
                let response = {
                    message: 'Failed to update cluster.',
                    data: result
                };
                res.status(404).json(response);
            } else {

                let response = { message: 'Cluster updated sucessfully.' };
                res.status(200).json(response);
            }

        } catch (error) {
            return next(error)
        }
    }
}

module.exports = clusterController;