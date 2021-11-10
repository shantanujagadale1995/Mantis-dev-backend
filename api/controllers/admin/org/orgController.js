const orgModel = require('../../../models/org');

const orgController = { 

    async createOrg(req, res, next) {
        // Time = 1.14
        // res.status(200).json(req.body);

        const { orgName, description, ownerName, ownerMail } = req.body;

        try {
            const data = new orgModel.orgModel({ orgName, description, ownerName, ownerMail });

            const result = await data.save();

            let response = { message: 'Org created sucessfully.' };

            res.status(200).json(response);

        } catch (error) {
            return next(error)
        }
    },

    async getOrgList(req, res, next) {
        try {
            const result = await orgModel.orgModel.find({}).select('-createdAt -updatedAt -__v');

            if (result) {
                let response = {
                    message: 'Org list get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Org not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async getOrgDetails(req, res, next) {
        const { id } = req.params;

        try {
            const result = await orgModel.orgModel.findOne({ _id: id });

            if (result) {
                let response = {
                    message: 'Org details get sucessfully.',
                    data: result
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Org not found.',
                    data: result
                };
                res.status(404).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },

    async updateOrgDetails(req, res, next) {

        const { orgName, description, ownerName, ownerMail, _id } = req.body;

        try {
            
            const result = await orgModel.orgModel.findOneAndUpdate({ _id }, { orgName, description, ownerName, ownerMail }, { new: true, runValidators: true });

            if (!result) {
                let response = {
                    message: 'Failed to update org.',
                    data: result
                };
                res.status(404).json(response);
            } else {

                let response = { message: 'Org updated sucessfully.' };
                res.status(200).json(response);
            }

        } catch (error) {
            return next(error)
        }
    },
    
    async deleteOrg(req, res, next) {
        const { id } = req.params;

        try {
            const result = await orgModel.orgModel.deleteOne({ _id: id });

            if (result) {
                let response = {
                    message: 'Org Deleted get sucessfully.'
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Org not found.',
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