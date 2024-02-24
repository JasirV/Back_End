const jwt = require("jsonwebtoken");

const tokengenerator = (id) => {
  try {
    const token = jwt.sign({ id: id }, process.env.USER_SECRET_STR, {
      expiresIn: process.env.LOGIN_EXPIRES,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

module.exports = tokengenerator;
