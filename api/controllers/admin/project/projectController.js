const projectModel = require('../../../models/project');
const orgModel = require('../../../models/org');

const orgController = {

    async createProject(req, res, next) {

        const { projectName, orgId, description, ownerName, ownerMail } = req.body;

        try {
            const data = new projectModel({ projectName, orgId, description, ownerName, ownerMail });

            const result = await data.save();

            let response
            if (result) {
                response = {
                    message: 'Project created sucessfully.',
                    data: {}
                };
            }
            res.status(200).json(response);

        } catch (error) {
            return next(error)
        }
    },

    async getProjectList(req, res, next) {

        try {
            const result = await projectModel
                // .find({})
                .aggregate([
                    {
                        $lookup:
                        {
                            from: 'org',
                            localField: 'orgId',
                            foreignField: '_id',
                            as: 'orgDetails'
                        }
                    }
                ]);
            // .select('-createdAt -updatedAt -__v');

            if (result) {
                
                for (const redultData of result) {
                    redultData.orgName = redultData.orgDetails.length ? redultData.orgDetails[0].orgName : '-';
                }

                let response = {
                    message: 'Project list get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Project not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async updateProject(req, res, next) {

        const { projectName, orgId, description, ownerName, ownerMail, _id } = req.body;

        try {

            const result = await projectModel.findOneAndUpdate({ _id }, { projectName, orgId, description, ownerName, ownerMail }, { new: true, runValidators: true });

            if (!result) {
                let response = {
                    message: 'Failed to update Project.',
                    data: result
                };
                res.status(404).json(response);
            } else {

                let response = { message: 'Project updated sucessfully.' };
                res.status(200).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async deleteProject(req, res, next) {
        const { id } = req.params;

        try {
            const result = await projectModel.deleteOne({ _id: id });

            if (result) {
                let response = {
                    message: 'Project Deleted sucessfully.'
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Project not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    }
}

module.exports = orgController;