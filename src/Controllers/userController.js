const userSchema=require('../Models/userSchema');
const bcrypt=require('bcrypt');
const userProduct=require('../Models/productSchema');
const tokengenerator=require('../utils/jsWebToken')
const productSchema = require('../Models/productSchema');
const { default: mongoose } = require('mongoose');


//Register User


const createUser=async(req,res)=>{
    const {name,email,username,password}=req.body

    const user= await userSchema.findOne({username:username})
    console.log(user);
    if(user){
        return res.status(400).json({
            message:'User allrady exist'
        })
    }
        const newUSer=await userSchema.create({
            name:name,
            email:email,
            username:username,
            password:password
        });
        res.status(201).json({
            status:'succes',
            data:{
                newUSer
            }
        })
    
}

//LoginUser

const logingUser=async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password

    const user=await userSchema.findOne({username}).select(`+password`);
    if(!user){
        return res.status(400).json({
            status:'fail',
            message:'Invalied input'
        });
    }
    if(!password||!user.password){
        return res.status(400).json({
            status:'fail',
            message:'Invalit Input '
        });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword){
        return res.status(401).json({
            status:'fail',
            message:'Authentication Failed'
        });

    }
    const token = tokengenerator(user._id);

    res.status(200).json({
        status:'succes',
        message:'Authentication succesful' ,
        token,
        data:{
            user
        }

    });
}

//View Product 

const viewProduct=async(req,res)=>{
    const product =await productSchema.find();
    if(!product){
        return res.status(404).json({
            status:'fail',
            message:'Product Not Found'
        })
    }
    res.status(200).json({
        status:'succes',
        message:'succesfully fecth datas',
        product:product
    })
}

//find the Product

const productById=async(req,res)=>{
    const productId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productById)){
        return res.status(400).json({
            status:'fail',
            message:'Invalied Product Id'
        })
    }
    const product =await productSchema.findById(productId)
        if(!product){
            res.status(404).json({
                status:'fail',
                message:'Product Not Found'
            })
        }
        res.status(200).json({
            status:'succes',
            message:'succesfuly  fetched  data',
            product:product
        })
    }
    //productCategory

    const productList=async(req,res)=>{
        const Paramscategory=req.params.categoryname;
        console.log(Paramscategory)
        const category =await productSchema.find({categoryname:Paramscategory})
        console.log(category);
        if(!category){
            return res.status(400).json({
                status:"fail",
                message:"Product Not Found !"
            })
        }
        res.status(200).json({
            status:"succes",
            message:'Successfully fetch Data',
            product:category
        })
    }

    // CART

    const addToCart=async(req,res)=>{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({
                status:'fail',
                message:'Invalid User ID format'
            })
        }
        const {productId}=req.body;
        if(!productId){
            return res.status(404).json({
                status:'fail',
                message:'Product Not Found !'
            })
        }
        const user =await userSchema.findById(userId);
        if(!user){
            return res.status(404).json({
                status:'fail',
                message:'User Not Found'
            })
        }
        if(user.cart.includes(productById)){
            return res.status(409).json({
                status:'fail',
                message:'Product already exists in the cart '
            })
        }
        await userSchema.updateOne({_id:userId},{$addToSet:{cart:productId}})
        res.status(200).json({
            status:'succes',
            message:'Product Add To Cart',
        })
    }

    //CartProduct
    
    const cartProduct=async(req,res)=>{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).json({
            status:'fail',
            message:'Invalid User ID format'
    })
    const user=userSchema.findById(userId)
    if(!user){
        return res.status(404).json({
            status:"fail",
            message:'User Not Found'
        })
    }
    const cartUserId=user.id
    if(cartUserId.length===0){
        return res.status(200).json({
            status:'success',
            message:'User Cart is Empty',
            data:[]
        })
    }
    const cartProducts=await productSchema.find({_id:{$in :cartUserId}});
    res.status(200).json({
        status:'success',
        message:'successfull fetch products',
        data:cartProduct
    })
    }

    //add to wishlist

    const addToWishList=async(req,res)=>{
        const userId=req.params.id;
        if(!userId){
            res.status(400).json({
                status:'fail',
                message:'User Not Found'

            })
        }
        const {productId}=req.body;
        const products=await productSchema.findById(productId)
        if(!products){
            return res.status(404).json({
                status:'fail',
                message:'Product not Found'
            })
        }
        const findProduct=await userSchema.findOne({_id:userId,wishlist:productId})
        if(!findProduct){
            return res.status(409).json({
                status:'fail',
                message:'Product all redey exist'
            })
        }
        await userSchema.updateOne({_id:userId},{$push :{wishlist:productId}})
            res.status(200).json({
                status:'succes',
                message:'Product successfuly add to wishlist'
            })
    }

    //Wish List


module.exports={
    createUser,logingUser,viewProduct,productById,productList,addToCart,cartProduct,addToWishList,
}