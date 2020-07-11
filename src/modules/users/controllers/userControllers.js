import { waterfall } from "async";
import userDbo from "../dbo/userDbo";
import helpers from "../../../helpers/index"
import middlewares from "../../../middleware/index"
import { getJwtToken, verifyToken } from "../../../helpers/jwt"


const registerUser = (req, res) => {

    waterfall([
        (next) => {
            userDbo.getUser({ email: req.body.email }, (err, response) => {
                if (err) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else if (response && response.status && response.status !== "inactive") {

                    let dePassword = helpers.encrypt(req.body.password)
                    let accessToken = getJwtToken(response, "access");

                    if (dePassword !== response.password) {
                        next({
                            status: 422,
                            message: "You have registered, but invalid password"
                        })
                    } else {
                        next({
                            status: 409,
                            message: "Email already registered",
                            token: accessToken,
                            email: response.email,
                            currentInteger: response.currentInteger
                        })
                    }
                } else {
                    next()
                }
            })
        }, (next) => {
            let enPassword = helpers.encrypt(req.body.password)

            let data = {
                name: req.body.name ? req.body.name : "user",
                email: req.body.email,
                password: enPassword,
                currentInteger: req.body.currentInteger,
                ProviderId: req.body.ProviderId,
                status: req.body.status
            }
            let accessToken = getJwtToken(data, "access")

            userDbo.createUser(data, (error, insertResp) => {

                if (error) {
                    next({
                        status: 400,
                        message: "Unable to creating the user"
                    }, null)
                } else {
                    next(null, {
                        status: 201,
                        message: "User successfully Registered",
                        token: accessToken,
                        email: insertResp.email,
                        currentInteger: insertResp.currentInteger
                    })
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(409).json({ success: false, ...error })
        else res.status(201).send({ success: true, ...resp })
    })
}

const getUserDetails = (req, res) => {
    waterfall([
        (next) => {
            userDbo.getUser({ email: req.user.data.email }, (err, res) => {
                if (err) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else if (!res) {
                    next({
                        status: 404,
                        message: "No user with this email"
                    })
                } else if (res) {
                    next({
                        status: 201,
                        email: res.email,
                        currentInteger: res.currentInteger
                    })
                } else {
                    next()
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, ...error })
        else res.status(200).send({ success: true, ...resp, data })
    })
}

const updateUserData = (req, res) => {
    let data = ''

    waterfall([
        (next) => {
            userDbo.getUser({ email: req.user.data.email }, (err, response) => {
                if (err) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else if (!response) {
                    next({
                        status: 404,
                        message: "No user with this email"
                    })
                } else {
                    next()
                }
            })
        }, (next) => {

            data = {
                currentInteger: req.body.currentInteger,
            }

            userDbo.updateUser({ email: req.user.data.email }, data, (error, resp) => {
                if (error) {
                    next({
                        status: 400,
                        message: "Error while updating the user details"
                    })
                } else if (!resp) {
                    next({
                        status: 400,
                        message: "Something went wrong in updating user"
                    })
                } else {
                    next(null, resp)
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, ...error })
        else res.status(200).send({ success: true, ...resp, data })
    })
}


export default {
    registerUser,
    updateUserData,
    getUserDetails,
}