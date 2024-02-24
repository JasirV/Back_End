const User = require("../Models/userSchema");
const mongoose = require("mongoose");
const Product = require("../Models/productSchema");

const createProduct = async (req, res) => {
  const { title, description, price, image, category } = req.body;
  console.log(title);
  const newProduct = await Product.create({
    title,
    description,
    price,
    image,
    category,
  });
  res.status(200).json({
    status: "success",
    message: "Successfuly Create New Product ",
    data: newProduct,
  });
};

module.exports = {
  createProduct,
};
