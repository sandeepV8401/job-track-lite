const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 
const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(plainPassword, salt);
  return hashed;
};

 
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

 
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
