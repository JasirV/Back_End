const express = require("express");
const adminRoutes = express.Router();
const adminController = require("../Controllers/adminController");
const tryCatch=require('../Middlewares/tryCatchMiddleware')
adminRoutes.post("/products", tryCatch(adminController.createProduct))
.get('/products',tryCatch(adminController.createProduct))
module.exports = adminRoutes;
