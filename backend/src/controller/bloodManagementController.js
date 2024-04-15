const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const User = require("../model/User.js");
const BloodCamp = require("../model/BloodCamp.js");
const BloodForm = require("../model/BloodForm.js");
const registerBloodCamps = asyncHandler(async (req, res) => {
  // Extracting data from the request body
  const {
    organizerName,
    location,
    date,
    capacity,
    contactPerson,
    contactNumber,
    organizerImage,
  } = req.body;
  console.log(req.body);

  // Validation check
  if (
    ![
      organizerName,
      location,
      date,
      capacity,
      contactPerson,
      contactNumber,
    ].every((field) => field && field.trim() !== "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  let organizerAddhar;

  // Check if the user provided a new Aadhar image for the blood camp
  if (organizerImage) {
    // Use the new Aadhar image provided in the request
    const organizerAddharLocalPath = req.files?.organizerAddhar[0]?.path;
    organizerAddhar = await uploadOnCloudinary(organizerAddharLocalPath);
  } else {
    // Retrieve user's Aadhar image from the database
    const user = await User.findById(req.user._id); // Assuming user is authenticated and user object is available in req.user
    organizerAddhar = user.addharImage;
    console.log(organizerAddhar);
  }

  if (!organizerAddhar) {
    throw new ApiError(400, "addharImage required");
  }

  // Create blood camp object
  const bloodCamp = await BloodCamp.create({
    organizerName,
    location,
    date,
    capacity,
    contactPerson,
    contactNumber,
    organizerAddhar,
  });

  //remove addharImage from response :-
  const createdCamp = await BloodCamp.findById(bloodCamp._id).select(
    "-organizerAddhar",
  );

  //check for bloodCamp creation :-
  if (!createdCamp) {
    throw new ApiError(500, "Error while registering the bloodcamp");
  }

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdCamp, "Blood camp registered successfully"),
    );
});

const registerBloodForms = asyncHandler(async (req, res) => {
  // Extracting data from the request body
  const {
    fullName,
    email,
    mobileNo,
    gender,
    age,
    bloodGroup,
    quantity,
    address,
    district,
    pincode,
    formType,
    reqPersonImage,
  } = req.body;

  // Validation check
  if (
    ![fullName, mobileNo, bloodGroup, pincode, formType].every(
      (field) => field && field.trim() !== "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  let reqPersonAddhar;

  // Check if the user provided a new Aadhar image for the blood camp
  if (reqPersonImage) {
    // Use the new Aadhar image provided in the request
    const reqPersonAddharLocalPath = req.files?.reqPersonAddhar[0]?.path;
    reqPersonAddhar = await uploadOnCloudinary(reqPersonAddharLocalPath);
  } else {
    // Retrieve user's Aadhar image from the database
    const user = await User.findById(req.user._id); // Assuming user is authenticated and user object is available in req.user
    reqPersonAddhar = user.addharImage;
    console.log(reqPersonAddhar);
  }

  if (!reqPersonAddhar) {
    throw new ApiError(400, "addharImage required");
  }

  // Create blood form object
  const bloodForm = await BloodForm.create({
    fullName,
    email,
    mobileNo,
    gender,
    age,
    bloodGroup,
    quantity,
    address,
    district,
    pincode,
    reqPersonAddhar,
    formType,
  });

  const createdForm = await BloodForm.findById(bloodForm._id).select(
    "-reqPersonAddhar -district -gender",
  );

  // Check for blood form creation
  if (!createdForm) {
    throw new ApiError(500, "Error while registering the blood form");
  }

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdForm, "Blood form registered successfully"),
    );
});

module.exports = { registerBloodCamps, registerBloodForms };
