import jwt from "jsonwebtoken"
import config from '../config/constants'
import helpers from './index'

let secretKey = config.JWT_SECRET_KEY

const getJwtToken = (data, tokenType) => {
    let expireTime = 1 * 60 * 60

    if (tokenType === 'refresh') {
        expireTime = 30 * 24 * 60 * 60
    }

    let resData = {
        _id: data._id,
        role: data.role,
        email: data.email,
    }

    let token = jwt.sign({
        data: resData,
    }, secretKey, {
            expiresIn: expireTime,
        })

    return token
}

const verifyToken = (token, cb) => {

    try {
        let data = jwt.verify(token, secretKey)
        cb(null, data)

    } catch (error) {
        cb({
            status: 409,
            message: "Unauthorized"
        }, null)
    }
}

export {
    getJwtToken,
    verifyToken,
}