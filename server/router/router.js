import {Router} from "express"
import * as controller from '../controllers/appController.js'
import {registerMail} from '../controllers/mailer.js'
import Auth,{localVariables} from '../middlewares/auth.js'

const router = Router();

/**GET Method */
router.get('/user/:username',controller.getUser)
router.get('/generateOTP',controller.verifyUser,localVariables,controller.generateOTP)
router.get('/verifyOTP',controller.verifyUser,controller.verifyOTP)
router.get('/createResetSession',controller.createResetSession)


/**POST Method */
router.post('/register',controller.register)
router.post('/registerMail',registerMail)
router.post('/authenticate',controller.verifyUser,(req,res)=>res.end());
router.post('/login',controller.verifyUser,controller.login)

/**PUT Method */
router.put('/updateUser',Auth,controller.updateUser) 
router.put('/resetPassword',controller.verifyUser,controller.resetPassword)


export default router; 