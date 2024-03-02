const express = require("express");
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes=require('./Routes/uesrRoutes')
const app = express();
const path = require('path')
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use("/admin", adminRoutes);
app.use('/users',userRoutes);

module.exports = app;
