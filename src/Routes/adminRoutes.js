const express = require("express");
const adminRoutes = express.Router();
const adminController = require("../Controllers/adminController");

adminRoutes.post("/products", adminController.createProduct);

module.exports = adminRoutes;
