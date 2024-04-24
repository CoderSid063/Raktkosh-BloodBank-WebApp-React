const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiError } = require("../utils/ApiError.js");
const User = require("../model/User.js");
const jwt = require("jsonwebtoken");

// This middlware verify the loginuser in my DB then add information object name:"user" in "request" like "req.objName".
const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    //get token from cookies or authorization :-
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Token:", token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    //verify and decode the token:-
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //find data of loginuser from db :-
    const user = await User.findById(decodeToken?._id).select(
      "-pasword -refreshToken",
    );

    if (!user) {
      throw new ApiError(404, "Invalid Acess Token");
    }
    console.log("User found in DB:", user);

    //add user information in requset
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});

// module.exports = { verifyJWT };
exports.verifyJWT = verifyJWT;
