const app=require("./app")
const connect=require('./configs/config')
const port=process.env.PORT||3000;
connect();
app.listen(port ,()=>console.log(`Server runnig is ${port}`))