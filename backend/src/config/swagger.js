/**
 * Auto-generated swagger.js
 * Serves Swagger UI at /api/docs
 */
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger.json");
const router = express.Router();
const options = { explorer: true, swaggerOptions: { persistAuthorization: true } };
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
module.exports = router;