const express = require("express");
const userController = require("../Controllers/userController");
const userRouter = express.Router();

userRouter
  .post("/register", userController.createUser)
  .post("/login", userController.logingUser)
  .get("/products", userController.viewProduct)
  .get("/products/:id", userController.productById)
  .get("/products/category/:categoryname", userController.productList)
  .post("/:id/cart", userController.addToCart)
  .get("/:id/cart", userController.cartProduct)
  .post("/:id/wishlist", userController.addToWishList)
  .get("/:id/wishlist", userController.wishList)
  .delete("/:id/wishlist", userController.deleteWishList)
  .post("/:id/payment", userController.PaymetSection)
  .get("/payment/success", userController.succesPayment)
  .get("/:id/orders", userController.Orders);
module.exports = userRouter;
