const express = require("express");
const router = express.Router();
const {
  getMilestones,
  addMilestone,
  updateMilestone,
  deleteMilestone,
} = require("../controllers/milestonecontroller");

// Routes
router.get("/", getMilestones);
router.post("/", addMilestone);
router.put("/:id", updateMilestone);
router.delete("/:id", deleteMilestone);

module.exports = router;




