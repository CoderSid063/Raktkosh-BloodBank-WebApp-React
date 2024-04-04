const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const User = require("../model/user.js");

// this method for generate access and refresh token
const tokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save reftoken in db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating the accesToken",
    );
  }
};

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

const loginUser = asyncHandler(async (req, res) => {
  //data from req.body:-
  const { email, phoneNumber, password } = req.body;
  console.log(req.body);

  //login with either username or email :-
  if (!(phoneNumber || email)) {
    throw new ApiError(400, "phonenumber or email required");
  }

  //find user or email exist in db:-
  const user = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  console.log(user);
  if (!user) {
    throw new ApiError(404, "user not exist");
  }

  //check for password :-
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password not valid");
  }

  //token generate :-
  const { accessToken, refreshToken } = await tokenGenerator(user._id);

  // sending cookies to user :-
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  console.log(loggedInUser);

  //options for cokkies:-
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged In successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  //options for cokkies:-
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logeed out successfully"));
});

module.exports = { registerUser, loginUser, logoutUser };
