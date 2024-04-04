const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const User = require("../model/user.js");

const registerUser = asyncHandler(async (req, res) => {
  /**
   * check files are uploaded from frontend {file:userRoutes}
   * validation check
   * check user already exist: email
   * check for image , check for avatar
   * upload the file in cloudnary
   * create user object- create entry in db
   * remove password and refresh token from response
   * check for user creation
   * return response
   */

  const {
    fullName,
    email,
    phoneNumber,
    password,
    gender,
    dateOfBirth,
    address,
  } = req.body;
  console.log(req.body);

  //validation check :-
  if (
    ![fullName, email, phoneNumber, password].every(
      (field) => field && field.trim() !== "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check user already exist: email :-
  const existedUser = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const addharImageLocalPath = req.files?.addharImage[0]?.path;

  // let addhaarImageLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.addharImage) &&
  //   req.files.addharImage.length > 0
  // ) {
  //   addharImageLocalPath = req.files.addharImage[0].path;
  // }
  //console.log(req.files);

  //check for image , check for avatar :-
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar required");
  }

  if (!addharImageLocalPath) {
    throw new ApiError(400, "addhar image required");
  }

  //upload the file in cloudnary :-
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const addharImage = await uploadOnCloudinary(addharImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar required");
  }

  //create user object- create entry in db :-
  const user = await User.create({
    fullName,
    avatar: avatar?.url || "",
    addharImage: addharImage?.url || "",
    email,
    password,
    phoneNumber,
    gender,
    dateOfBirth,
    address,
  });

  //remove password and refresh token from response :-
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  //check for user creation :-
  if (!createdUser) {
    throw new ApiError(500, "Error while registering thr user");
  }

  //return response :-
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully"));
});

module.exports = { registerUser, loginUser, logoutUser };
