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
                    next({
                        status: 409,
                        message: "Email already registered"
                    })
                } else {
                    next()
                }
            })
        }, (next) => {

            let enPassword = helpers.encrypt(req.body.password)

            let data = {
                name: req.body.name,
                email: req.body.email,
                password: enPassword,
                mobile: req.body.mobile,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
                status: req.body.status
            }

            userDbo.createUser(data, (error, insertResp) => {

                if (error) {
                    next({
                        status: 400,
                        message: "Unable to creating the user"
                    }, null)
                } else {
                    next(null, {
                        status: 201,
                        message: "User successfully Registered"
                    })
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(400).send({ success: false, ...error })
        else res.status(201).send({ success: true, ...resp })
    })
}

const loginUser = (req, res) => {
    let data = req.body
    let dePassword = helpers.encrypt(data.password)

    waterfall([
        (next) => {
            userDbo.getUser({ email: data.email }, (err, response) => {

                if (err) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else if (response === null) {
                    next({
                        status: 404,
                        message: "No user found with this email"
                    })
                } else if (dePassword !== response.password) {
                    next({
                        status: 422,
                        message: "Invalid password"
                    })
                } else if (response.status === "inactive") {
                    next({
                        status: 422,
                        message: "You are suspended by admin"
                    })
                } else {
                    next(null, response)
                }
            })
        }, (response, next) => {
            let accessToken = getJwtToken(response, "access")

            if (accessToken) {
                next(null, {
                    status: 201,
                    message: `Welcome ${response.name}`,
                    token: accessToken,
                })
            } else {
                next({
                    status: 400,
                    message: "Error while generating jwt token"
                })
            }
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, ...error })
        else res.status(200).send({ success: true, ...resp })
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
                } else if (req.user.data.email !== req.body.email) {
                    next({
                        status: 422,
                        message: "Please use your token to update your details"
                    })
                } else {
                    next()
                }
            })
        }, (next) => {
            let enPassword = helpers.encrypt(req.body.password)

            data = {
                name: req.body.name,
                email: req.body.email,
                password: enPassword,
                mobile: req.body.mobile,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
                status: req.body.status
            }

            userDbo.updateUser({ email: req.body.email }, data, (error, resp) => {
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

const deleteUserData = (req, res) => {

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
                        message: "No user found with this email id"
                    })
                } else {
                    next(null, response)
                }
            })
        }, (userRes, next) => {
            userDbo.deleteUser({ email: userRes.email }, (error, deleteRes) => {

                if (error) {
                    next({
                        status: 400,
                        message: "Error while deleting the use details"
                    })
                } else if (!deleteRes) {
                    next({
                        status: 400,
                        message: "Something went wrong while deleting user"
                    })
                } else (
                    next(null, deleteRes)
                )
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, ...error })
        else res.status(200).send({ success: true, ...resp })
    })
}

const getAllUsersData = (req, res) => {

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
                        message: "No user found with this email id"
                    })
                } else {
                    next()
                }
            })
        }, (next) => {
            userDbo.getAllUsers((error, response) => {
                if (error) {
                    next({
                        status: 400,
                        message: "Error while fetching all user details"
                    })
                } else if (!response) {
                    next({
                        status: 400,
                        message: "Something went wrong while fetching all user details"
                    })
                } else {
                    next(null, response)
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, ...error })
        else res.status(200).send({ success: true, ...resp })
    })
}

const getSingleUserDetails = (req, res) => {

    waterfall([
        (next) => {
            userDbo.getUser({ email: req.user.data.email }, (error, response) => {
                if (error) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else if (!response) {
                    next({
                        status: 400,
                        message: "Something went wrong while fetching single user details"
                    })
                } else {
                    next(null, response)
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, error })
        else res.status(200).send({ success: true, ...resp._doc })
    })
}

const updatePassword = (req, res) => {

    waterfall([
        (next) => {
            userDbo.getUser({ email: req.user.data.email }, (error, response) => {
                if (error) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else if (!response) {
                    next({
                        status: 400,
                        message: "Something went wrong while fetching user response"
                    })
                } else {
                    next()
                }
            })
        }, (next) => {
            let enPassword = helpers.encrypt(req.body.password)

            userDbo.updateUser({ email: req.user.data.email }, { password: enPassword }, (updateErr, updateRes) => {
                if (updateErr) {
                    next({
                        status: 400,
                        message: "Error while updating user"
                    })
                } else if (!updateRes) {
                    next({
                        status: 400,
                        message: "Something went wrong while updating user password"
                    })
                } else {
                    next(null, updateRes)
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, error })
        else res.status(200).send({ success: true, ...resp })
    })
}

const uploadFile = (req, res) => {

    waterfall([
        (next) => {
            middlewares.upload(req, res, function (err) {
                if (err) {
                    next({
                        status: 500,
                        message: "Internal server error"
                    })
                } else {
                    if (req.file.path) {
                        next()
                    } else {
                        next({
                            status: 400,
                            message: "Image path should not be null"
                        })
                    }
                }
            })
        }, (next) => {
            userDbo.updateUser({ email: req.user.data.email }, { picPath: req.file.path }, (updateErr, updateRes) => {

                if (updateErr) {
                    next({
                        status: 400,
                        message: "Error while updating user profile pic"
                    })
                } else if (!updateRes) {
                    next({
                        status: 400,
                        message: "Something went wrong while uploading user pic"
                    })
                } else {
                    next(null, updateRes)
                }
            })
        }
    ], (error, resp) => {
        if (error) res.status(404).send({ success: false, error })
        else res.status(200).send({ success: true, ...resp })
    })
}

export default {
    registerUser,
    loginUser,
    updateUserData,
    deleteUserData,
    getAllUsersData,
    getSingleUserDetails,
    updatePassword,
    uploadFile
}