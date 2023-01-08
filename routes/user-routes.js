import express from 'express'
import  userController  from '../controllers/user-controller.js'
import  adminController  from '../controllers/admin-controller.js'

const router = express.Router()
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getfoods', adminController.getFoods)
router.get('/getfood/:id', adminController.getFood)
router.post('/send-email', userController.sendEmail)
router.post('/verify-code', userController.verifyCode)
router.post('/reset-password', userController.resetPassword)
export default router