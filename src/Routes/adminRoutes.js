const express = require("express");
const adminRoutes = express.Router();
const adminController = require("../Controllers/adminController");
const tryCatch=require('../Middlewares/tryCatchMiddleware')
const adminauth=require('../Middlewares/adminAuth')
adminRoutes.post('/login',adminController.adminLogin)
.use(adminauth)
.post("/products", tryCatch(adminController.createProduct))
.get('/products',tryCatch(adminController.adminProduct))
.get('/users',adminController.users)
.get('/:id/users',adminController.userById)
.get('/:id/products',adminController.productById)
.put('/products',adminController.UpdateProducts)
.delete('/products',adminController.deleteProduct)
.get('/Revenue',adminController.totalRevenue)
.get('/order',adminController.order)
module.exports = adminRoutes;
