import {Router} from "express"
import * as controller from '../controllers/appController.js'


const router = Router();

/**GET Method */
router.get('/user/:username',controller.getUser)
router.get('/generateOTP',controller.generateOTP)
router.get('/verifyOTP',controller.verifyOTP)
router.get('/createResetSession',controller.createResetSession)


/**POST Method */
router.post('/register',controller.register)
// router.post('registerMail',registerMailRoute)
router.post('/authenticate',(req,res)=>res.end());
router.post('/login',controller.login)

/**PUT Method */
router.put('/updateuser',controller.uodateUser)
router.put('/resetPassword',controller.resetPassword)


export default router;