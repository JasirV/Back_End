const express = require("express");
const userRouter = require("./Routes/uesrRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/admin", adminRoutes);

module.exports = app;
