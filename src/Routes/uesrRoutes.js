const express =require('express')
const userController=require('../Controllers/userController')
const userRouter=express.Router()

userRouter.post('/register',(userController.createUser))
.post('/login',(userController.logingUser))
.get('/products', userController.viewProduct)
.get('/products/:id',(userController.productById))


module.exports=userRouter;