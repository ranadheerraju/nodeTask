import crypto from "crypto"
import config from "../config/constants"

const algorithm = config.ALGORITHM
const privateKey = config.PASSWORD

const encodeText = (text) => {
    var encodedText = crypto.createHash('sha256').update(text).digest('hex')
    return encodedText
}

const encrypt = (data) => {
    data = JSON.stringify(data)
    var encipher = crypto.createCipher(algorithm, privateKey)
    var encrypted = encipher.update(data, 'utf8', 'hex')
    encrypted += encipher.final('hex')
    return encrypted
}

const decrypt = (data) => {
    var decipher = crypto.createDecipher(algorithm, privateKey)
    var dec = decipher.update(data, 'hex', 'utf8')
    dec += decipher.final('utf8')
    dec = JSON.parse(dec)
    return dec
}

export default {
    encodeText,
    decrypt,
    encrypt,
}
