const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    default: "Incomplete",
  },
});

module.exports = mongoose.model("Milestone", MilestoneSchema);
