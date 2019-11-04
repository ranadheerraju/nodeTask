import joi from "joi";
import { validator, regex } from "../../../utils/index";

const signupValidations = (req, res, next) => {
    let data = req.body

    let signupSchema = joi.object().keys({
        name: joi.string().required().min(3).max(20),
        email: joi.string().email().required().min(3).max(50),
        password: joi.string().required().min(6).max(32),
        mobile: joi.string().required().min(10).max(14),
    }).options({ allowUnknown: true })

    validator(data, signupSchema, (error, resp) => {
        if (error) {
            res.status(422).send({ message: error.message })
        } else {
            next()
        }
    })
}

const signinValidations = (req, res, next) => {
    let data = req.body

    let signinSchema = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    }).options({ allowUnknown: true })

    validator(data, signinSchema, (error, resp) => {
        if (error) {
            res.status(422).send({ message: error.message })
        } else {
            next()
        }
    })
}

export default {
    signupValidations,
    signinValidations
}