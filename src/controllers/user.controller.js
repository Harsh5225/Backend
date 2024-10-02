import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // console.log("registerUser route hit");
  // res.status(200).json({
  //   message: "ok",
  // });

  const { fullname, email, username, password } = req.body;
  console.log("Email:", email);

  // if(fullname===""){
  //   throw new ApiError(400,"fullname is required")
  // }

  // 9:02:41 /
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  // if (email) {
  //   if (!email.includes("@")) throw new ApiError(400, "Your email is invalid");
  // }

  // 2. User already exists or not
  const existedUser = await User.findOne({
    $or: [{ username }, { email }], //9:06:30
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist.");
  }

  // Handle images  9:09:06  req.files -> multer de deta default jaise express deta hai req.body
  const avatarlocalPath = req.files?.avatar[0]?.path;

  // optional chaining .?


  //mistake - undefined
  // 💡 const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // classic way js
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.lenth>0){
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarlocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  // Upload on cloudinary

  const avatar = await uploadOnCloudinary(avatarlocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  //  9:23:48  select -> jo jo nahi chaiye
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong during the registering of the user"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
