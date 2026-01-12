 
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require("../../utils/jwt");
const User = require("../user/user.model");

 
const signupService = async ({ name, email, password }) => {
   
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409; 
    throw error;
  }

   
  const hashedPassword = await hashPassword(password);

   
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
     });

   
  const token = generateToken({ id: user._id, email: user.email });

   
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

 
const loginService = async ({ email, password }) => {
   
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401; 
    throw error;
  }

   
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

   
  const token = generateToken({ id: user._id, email: user.email });

   
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

 
const getMyProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

 
const updateProfileService = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, select: "-password" }
  );
  return updatedUser;
};

 
const logoutService = async (userId) => {
   
   
  return {
    message: "User logged out successfully",
    userId,
  };
};

module.exports = {
  signupService,
  loginService,
  getMyProfileService,
  logoutService,
  updateProfileService,
};
