const userSchema=require('../Models/userSchema');
const bcrypt=require('bcrypt');
const userProduct=require('../Models/productSchema');
const productSchema = require('../Models/productSchema');
const { default: mongoose } = require('mongoose');



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
    // const token=ganerateToken(user._id)

    res.status(200).json({
        status:'succes',
        message:'Authentication succesful' ,
        // token,
        data:{
            user
        }

    });
}

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
const productById=async(req,res)=>{
    const productId=res.params.id;
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

    // const productList=async(req,res)=>{

    // }


module.exports={
    createUser,logingUser,viewProduct,productById
}