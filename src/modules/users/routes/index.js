import { Router } from 'express'
import userControllers from '../controllers/userControllers'
import userValidations from '../validators/userValidators'
import middlewares from '../../../middleware/index'

let routes = Router()

routes.post('/signup', userValidations.signupValidations, userControllers.registerUser)
routes.post('/signin', userValidations.signinValidations, userControllers.loginUser)
routes.post('/verify', middlewares.isAuthonticated)
routes.put('/update', userValidations.signupValidations, middlewares.isAuthonticated, userControllers.updateUserData)
routes.delete('/delete', middlewares.isAuthonticated, userControllers.deleteUserData)
routes.get('/all', middlewares.isAuthonticated, userControllers.getAllUsersData)
routes.get('/me', middlewares.isAuthonticated, userControllers.getSingleUserDetails)
routes.post('/check', middlewares.isAuthonticated, middlewares.isAuthorized(['admin']))
routes.put('/changepassword', middlewares.isAuthonticated, userControllers.updatePassword)
routes.post('/upload', middlewares.isAuthonticated, userControllers.uploadFile)

export default routes