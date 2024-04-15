const mongoose = require("mongoose");
const { Schema } = mongoose;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

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
    organizerAddhar: {
      type: String,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

bloodCampSchema.plugin(aggregatePaginate);
const BloodCamp = mongoose.model("BloodCamp", bloodCampSchema);

module.exports = BloodCamp;
