const fs=require('fs');
const path=require('path')
const multer=require('multer')
const store=multer.diskStorage({
    destination:path.join(__dirname,'upload'),
    filename:(req,res,next)=>{
        next(null,Date.now()+file.originalname)
    }
})
const upload=multer({storage});
const cloudinary=require('cloudinary').v2
co