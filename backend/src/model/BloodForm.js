const mongoose = require("mongoose");

const bloodFormSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    age: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    reqPersonAddhar: {
      type: String,
    },
    formType: {
      type: String,
      enum: ["bloodDonation", "bloodRequest"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const BloodForm = mongoose.model("BloodForm", bloodFormSchema);

module.exports = BloodForm;
