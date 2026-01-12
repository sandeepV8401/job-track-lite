const express = require("express");
const router = express.Router();

const protect = require("../../middlewares/auth.middleware");

const {
  addJobHandler,
  getJobsHandler,
  getJobByIdHandler,
  updateJobByIdHandler,
  filterJobsHandler,
  deleteJobByIdHandler
} = require("./job.controller");

router.get("/", protect, getJobsHandler);
router.get("/filter", protect, filterJobsHandler);
router.post("/add", protect, addJobHandler);
router.get("/:id", protect, getJobByIdHandler);
router.patch("/:id", protect, updateJobByIdHandler);
router.delete("/:id", protect, deleteJobByIdHandler);

module.exports = router;
