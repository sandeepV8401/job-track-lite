const {
  signupService,
  loginService,
  getMyProfileService,
  logoutService,
  updateProfileService,
} = require("./auth.service");
const {
  signupSchema,
  loginSchema,
  updateProfileSchema,
} = require("./auth.schema");

const signupHandler = async (req, res) => {
  const { name, email, password } = signupSchema.parse(req.body);

  const result = await signupService({ name, email, password });
  res.status(201).json({
    success: true,
    message: "User signed up successfully",
    user: {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
    },
    token: result.token,
  });
};

const loginHandler = async (req, res) => {
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  const result = await loginService({ email, password });
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
      phone: result.user.phone || null,
      skills: result.user.skills || null,
      address: result.user.address || null,
    },
    token: result.token,
  });
};

const myProfileHandler = async (req, res) => {
  const userId = req.user.id;

  const user = await getMyProfileService(userId);
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      skills: user.skills || null,
      address: user.address || null,
    },
  });
};

const updateProfileHandler = async (req, res) => {
  const validatedData = updateProfileSchema.parse(req.body);

  "req.user.id", req.user.id;
  const userId = req.user.id;

  const user = await updateProfileService(userId, validatedData);
  res.status(200).json({
    success: true,
    mesasge: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      skills: user.skills || null,
      address: user.address || null,
    },
  });
};

const logoutHandler = async (req, res) => {
  const userId = req.user?.id || null;

  const result = await logoutService(userId);
  res.status(200).json({
    success: true,
    message: result.message,
    userId: result.userId,
  });
};

module.exports = {
  signupHandler,
  loginHandler,
  myProfileHandler,
  updateProfileHandler,
  logoutHandler,
};
