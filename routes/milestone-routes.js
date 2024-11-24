const express = require("express");
const router = express.Router();
const Milestone = require("../models/milestone");

// List all milestones
router.get("/", async (req, res) => {
  try {
    const milestones = await Milestone.find();
    res.render("milestones", { milestones });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Add a new milestone
router.post("/", async (req, res) => {
  try {
    const { subject, description, deadline } = req.body;
    const newMilestone = new Milestone({
      subject,
      description,
      deadline: deadline || null,
    });
    await newMilestone.save();
    res.redirect("/milestones");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Mark a milestone as complete
router.put("/:id", async (req, res) => {
  try {
    await Milestone.findByIdAndUpdate(req.params.id, { status: "Complete" });
    res.redirect("/milestones");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete a milestone
router.delete("/:id", async (req, res) => {
  try {
    await Milestone.findByIdAndDelete(req.params.id);
    res.redirect("/milestones");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;



