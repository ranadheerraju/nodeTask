import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// import morgan from 'morgan'
import userRoutes from './modules/users/routes/index'
import config from './config/constants'
// import winston from './config/winston'

var uri = `${config.MONGOURL}/${config.DBNAME}`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log('Error in connecting to db')
    } else {
        console.log('Mongoose successfully connected to', config.DBNAME)
    }
})

var app = express();
var path = require("path")
app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRoutes)
app.use('/uploads', express.static('uploads'))

export default app;