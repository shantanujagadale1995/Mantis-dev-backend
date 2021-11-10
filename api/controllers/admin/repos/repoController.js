const CustomErrorHandler = require('../../../Services/CustomErrorHandler');
const repoModel = require('../../../models/repo');

const repoController = {

    async createRepo(req, res, next) {

        const { provider, connectionType, repoUrl, username, personalAccessToken } = req.body;

        try {
            const data = new repoModel({ provider, connectionType, repoUrl, username, personalAccessToken });

            const result = await data.save();

            let response
            if (result) {
                response = {
                    message: 'Repo created sucessfully.',
                    data: {}
                };
            }
            res.status(200).json(response);

        } catch (error) {
            return next(error)
        }
    },
    async getrepoList(req, res, next) {

        try {
            const result = await repoModel.find({}).select('-createdAt -updatedAt -__v');

            if (result) {

                let response = {
                    message: 'Repo list get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Repo not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }

    },
    async updateRepoList(req, res, next) {

        const { provider, connectionType, repoUrl, username, personalAccessToken, _id } = req.body;

        try {

            const result = await repoModel.findOneAndUpdate({ _id }, { provider, connectionType, repoUrl, username, personalAccessToken, }, { new: true, runValidators: true });

            if (!result) {
                let response = {
                    message: 'Failed to update repo.',
                    data: result
                };
                res.status(404).json(response);
            } else {

                let response = { message: 'Repo updated sucessfully.' };
                res.status(200).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },
    async deleteRepo(req, res, next) {
        const { id } = req.params;

        try {
            const result = await repoModel.deleteOne({ _id: id });

            if (result) {
                let response = {
                    message: 'Repo Deleted sucessfully.'
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Repo not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }

    },
    async getRepoDetails(req, res, next) {
        const { id } = req.params;

        try {
            const result = await repoModel.findOne({ _id: id });

            if (result) {
                let response = {
                    message: 'Repo details get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Repo not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },
}

module.exports = repoController;