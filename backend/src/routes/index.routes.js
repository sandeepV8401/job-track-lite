const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const jobRoutes = require("../modules/jobs/job.routes");

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);

module.exports = router;
