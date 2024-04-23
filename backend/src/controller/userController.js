const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

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
  // console.log(req.body);

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
  // console.log(avatarLocalPath);
  const addharImageLocalPath = req.files?.addharImage[0]?.path;
  // console.log(addharImageLocalPath);

  //check for image , check for avatar :-
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar path required");
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
  console.log(user);
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized access");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } = await tokenGenerator(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!(newPassword === confirmPassword)) {
    throw new ApiError(401, "Both passord must be same");
  }

  user.password = confirmPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;

  if (!(fullName || email || phoneNumber)) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        phoneNumber,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

const updateUserAddharImage = asyncHandler(async (req, res) => {
  const addharImageLocalPath = req.file?.path;

  if (!addharImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  const addharImage = await uploadOnCloudinary(addharImageLocalPath);

  if (!addharImage.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        addharImage: addharImage.url,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Addhar image updated successfully"));
});

const getUserProfileDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log(userId);

  // Use MongoDB aggregation pipeline to aggregate data from multiple collections
  const userProfileDetails = await User.aggregate([
    // Match the user by their ID
    {
      $match: { _id: userId },
    },
    // Lookup blood camps organized by the user
    {
      $lookup: {
        from: "bloodcamps",
        localField: "_id",
        foreignField: "organizer",
        as: "organizedBloodCamps",
      },
    },
    // Lookup blood forms submitted by the user
    {
      $lookup: {
        from: "bloodforms",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$userId", "$submittedBy"] },
            },
          },
          {
            $project: {
              _id: 1,
              fullName: 1,
              bloodGroup: 1,
              quantity: 1,
              formType: 1,
              type: {
                $cond: {
                  if: { $eq: ["$formType", "bloodDonation"] },
                  then: "donation",
                  else: "request",
                },
              },
            },
          },
        ],
        as: "submittedBloodForms",
      },
    },
    // Add a field to calculate the count of submitted blood forms
    {
      $addFields: {
        submittedBloodFormsCount: { $size: "$submittedBloodForms" },
      },
    },
    // Projection stage to reshape the output
    {
      $project: {
        fullName: 1,
        email: 1,
        phoneNumber: 1,
        submittedBloodForms: 1,
        organizedBloodCamps: {
          $size: "$organizedBloodCamps", // Count of organized blood camps
        },
        submittedBloodFormsCount: 1, // Include the count of submitted blood forms
      },
    },
  ]);
  console.log(userProfileDetails);
  if (!userProfileDetails || userProfileDetails.length === 0) {
    throw new ApiError(404, "User not found");
  }

  // Return the user profile details
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userProfileDetails[0],
        "User profile details retrieved successfully",
      ),
    );
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserAddharImage,
  getUserProfileDetails,
};
