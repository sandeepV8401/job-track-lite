const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";
  let errors = null;

  if (err.name === "ZodError" || err instanceof ZodError) {
    statusCode = 400;
    if (err.issues && Array.isArray(err.issues)) {
      errors = err.issues.map(issue => ({
        field: Array.isArray(issue.path) ? issue.path.join(".") : issue.path || "data",
        message: issue.message
      }));
      message = errors.map(e => e.message).join(", ");
    } else {
      message = "Validation Error";
    }
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    if (err.errors) {
      errors = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      }));
      message = errors.map(e => e.message).join(", ");
    }
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (err.message && typeof err.message === "string") {
    statusCode = err.statusCode || 400;
    message = err.message;
  }

  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  console.error("❌ ERROR RESPONSE:", JSON.stringify(response, null, 2));
  res.status(statusCode).json(response);
};
