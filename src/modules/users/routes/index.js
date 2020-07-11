import { Router } from 'express'
import userControllers from '../controllers/userControllers'
import userValidations from '../validators/userValidators'
import middlewares from '../../../middleware/index'

let routes = Router()

routes.post('/signup', userValidations.signupValidations, userControllers.registerUser)
routes.post('/verify', middlewares.isAuthonticated)
routes.get('/current', middlewares.isAuthonticated, userControllers.getUserDetails)
routes.put('/update', middlewares.isAuthonticated, userControllers.updateUserData)

export default routes