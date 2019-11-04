import app from './src'
import morgan from 'morgan'
import winston from './src/config/winston'
import config from './src/config/constants'

app.use(morgan('combined', { stream: winston.stream }))

app.get('/', (req, res) => {
    res.status(200).send({
        status: "Server running"
    })
})

app.listen(config.PORT)