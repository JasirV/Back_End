const jwt = require("jsonwebtoken");
require('dotenv').config();

const tokengenerator = (id) => {
  try {
    console.log("Secret key:", process.env.USER_ACCESS_TOKEN_SECRET); // Debugging
    const token = jwt.sign({ id: id }, process.env.USER_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.LOGIN_EXPIRES,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

module.exports = tokengenerator;
