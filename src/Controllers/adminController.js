const User = require("../Models/userSchema");
const mongoose = require("mongoose");
const Product = require("../Models/productSchema");
const productSchema = require("../Models/productSchema");


//create Products
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


// show the products
const adminProduct=async(req,res)=>{
  const products=await productSchema.find();
  if(!products){
    return res.status(404).json({
      status:'fail',
      message:'Products Not found'
    })
  }
  res.status(200).json({
    status:'success',
    message:'successfuly fetch Products',
    data:products
  })
};



module.exports = {
  createProduct,adminProduct
};
