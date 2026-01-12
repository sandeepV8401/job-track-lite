const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(Object.assign(new Error("Authorization token missing"), { statusCode: 401 }));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(Object.assign(new Error("Invalid or expired token"), { statusCode: 401 }));
  }
};

module.exports = protect;
