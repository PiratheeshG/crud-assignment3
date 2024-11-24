const Milestone = require("../models/milestone");

// Get all milestones
exports.getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find();
    res.render("layouts/main", { content: "milestones", milestones });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Add a milestone
exports.addMilestone = async (req, res) => {
  try {
    await Milestone.create(req.body);
    res.redirect("/milestones");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update a milestone
exports.updateMilestone = async (req, res) => {
  try {
    await Milestone.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/milestones");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete a milestone
exports.deleteMilestone = async (req, res) => {
  try {
    await Milestone.findByIdAndDelete(req.params.id);
    res.redirect("/milestones");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};



