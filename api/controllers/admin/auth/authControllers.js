const Joi = require('joi');
const bcrypt = require('bcrypt');
const { userModel } = require('../../../models');

const CustomErrorHandler = require('../../../Services/CustomErrorHandler');
const JwtService = require('../../../Services/JwtService');

const authControllers = {

    async login(req, res, next) {

        const validationScheme = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error } = validationScheme.validate(req.body);

        if (error) return next(error);

        const { email, password } = req.body;

        data = { email, password }

        token = await JwtService.sign(data);

        let response = {
            status: 200,
            message: 'User Login Successfully.',
            data: { token: token }
        };

        res.status(200).json(response);
    },

    async register(req, res, next) {

        const validationScheme = Joi.object({
            name: Joi.string().min(3).max(10).required(),
            email: Joi.string().required(),
            // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3-30}$')).required(),
            password: Joi.string().required(),
            // confPassword: Joi.ref('password'),
            role: Joi.string().required(),
        });

        const { error } = validationScheme.validate(req.body);

        if (error) return next(error); // Handled by Error Handleling middleware.

        let data;
        try {

            // const data = new orgModel.orgModel({ orgName, description, ownerName, ownerMail }).select({'-password '});

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const { name, email, role } = req.body;

            try {
                const data = new userModel({ name, email, password: hashedPassword, role });

                const result = await data.save(response => {
                    console.log("Response", response);
                });

            } catch (error) {
                console.log(error);
                return next(error)
            }

            if (!result) { return next(error) }

            let response = {
                status: 200,
                message: 'User Login Successfully.',
            };

            res.status(200).json(response);


        } catch (error) {
            return next(error);
        }

        // CustomErrorHandler.error(500, 'Custom Error Here..!');

        // res.status(200).json(data);
    }
}

module.exports = authControllers;