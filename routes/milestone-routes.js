const express = require("express");
const router = express.Router();
const Milestone = require("../models/milestone"); // Import Milestone model

// Route to list all milestones
router.get("/", async (req, res) => {
  try {
    const milestones = await Milestone.find(); // Fetch all milestones from the database
    res.render("milestones", { milestones }); // Render milestones page with data
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to add a new milestone
router.post("/", async (req, res) => {
  try {
    const { subject, description, deadline } = req.body;
    const newMilestone = new Milestone({
      subject,
      description,
      deadline: deadline || null,
    });
    await newMilestone.save(); // Save new milestone to the database
    res.redirect("/milestones"); // Redirect back to milestones page
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to update a milestone's status
router.put("/:id", async (req, res) => {
  try {
    await Milestone.findByIdAndUpdate(req.params.id, { status: "Complete" });
    res.redirect("/milestones"); // Redirect back to milestones page
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route to delete a milestone
router.delete("/:id", async (req, res) => {
  try {
    await Milestone.findByIdAndDelete(req.params.id);
    res.redirect("/milestones"); // Redirect back to milestones page
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
