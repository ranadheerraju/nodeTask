require('dotenv').config()

const MONGOURL = process.env.MONGOURL
const PORT = process.env.PORT
const DBNAME = process.env.DBNAME
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const ALGORITHM = process.env.ALGORITHM
const PASSWORD = process.env.PASSWORD

export default {
    MONGOURL,
    PORT,
    DBNAME,
    JWT_SECRET_KEY,
    ALGORITHM,
    PASSWORD,
}