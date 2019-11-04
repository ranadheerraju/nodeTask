import joi from 'joi'

const validator = (data, schema, cb) => {
    joi.validate(data, schema, (error, res) => {
        if (error) {
            cb({
                message: error.details[0].message
            }, null)
        } else {
            cb(null, {
                isValid: true
            })
        }
    })
}

const regex = {
    alphaNumeric: /^[a-zA-Z0-9_]+$/,
}

export {
    validator,
    regex
}