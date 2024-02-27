const User = require("../Models/userSchema");
const mongoose = require("mongoose");
const Product = require("../Models/productSchema");
const productSchema = require("../Models/productSchema");
const jwt=require('jsonwebtoken')
const userSchema =require('../Models/userSchema')


//ADMIN LOGING


const adminLogin= async(req,res)=>{
  const {username,password}=req.body
  if(username===process.env.ADMIN_USERNAME&&password===process.env.ADMIN_PASSWORD){
    const token=jwt.sign({username:username},process.env.ADMIN_SECRET_STR);
    res.status(200).json({
      status:'success',
      data:token
    })
  }else{
    res.status(404).json({
      status:'error',
      message:'this is no an admin'
    })
  }
}


// USERS FIND

const users=async(req,res)=>{
  const findUsers=await userSchema.find()

  if(!findUsers){
    return res.status(404).json({
      status:'Error',
      message:'Users Not Found'
    })
  }
  res.status(200).json({
    status:'success',
    message:'successfuly fecth User Data',
    data:findUsers
  })
}


//UserBYId


const userById=async (req,res)=>{
  const userId=req.params.id;
  if(!userId){
    return res.status(404).json({
      status:'Error',
      message:'Invalid User ID'
    })
  }
  const user=await userSchema.findById(userId)

  if(!user){
    return res.status(404).json({
      status:'Error',
      message:'User Not Found'
    })
  }
  res.status(200).json({
    status:'success',
    message:'successfuly fetch User Data',
    data:user
  })
}



//create Products
const createProduct = async (req, res) => {
  const { title, description, price, image, category } = req.body;
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
const adminProduct = async (req, res) => {
  const products = await productSchema.find();
  if (!products) {
    return res.status(404).json({
      status: "fail",
      message: "Products Not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfuly fetch Products",
    data: products,
  });
};


//PRODUCT BY ID FOR ADDMIN


const productById=async (req,res)=>{
  const {productId}=req.params.id;
  if(!productId){
    return res.status(400).json({
      status:'fail',
      message:'No Id'
    })
  }
  const product =await productSchema.findById(productId)
}




module.exports = {
  createProduct,
  adminProduct,
};
