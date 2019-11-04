import { verifyToken } from "../helpers/jwt"

var multer = require("multer")
var fs = require("fs")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "./uploads"
        fs.exists(dir, exist => {
            if (!exist) {
                return fs.mkdir(dir, error => cb(error, dir))
            } else {
                return cb(null, dir)
            }
        })
    },
    filename: function (req, file, cb) {
        cb(null, '' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

const isAuthonticated = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        res.status(404).send({
            success: false,
            message: "Missing authorization token"
        })
    }

    verifyToken(token, (error, resp) => {

        if (error) {
            res.status(400).send(error)
        } else {
            req.user = resp
            next(null, resp)
        }
    })
}

const isAuthorized = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.data.role)) {
            res.status(200).send({
                success: true,
                message: "Your a valid user"
            })
        } else {
            res.status(401).send({
                success: false,
                message: "Unauthorized role"
            })
        }
    }
}

export default {
    isAuthonticated,
    isAuthorized,
    upload,
}