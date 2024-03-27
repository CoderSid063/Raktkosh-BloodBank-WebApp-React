const mongoose = require("mongoose");

const bloodCampSchema = new mongoose.Schema(
  {
    organizerName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const BloodCamp = mongoose.model("BloodCamp", bloodCampSchema);

module.exports = BloodCamp;
