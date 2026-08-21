import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  updateUserPassword,
} from "../models/auth.Model.js";
import {
  generateRefreshTokens,
  verifyAccessToken,
  generateAccessTokens,
  verifyRefreshTokens,
} from "../utils/token.utils.js";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../utils/cookies.utils.js";
import { saveRefreshToken } from "../models/user.Model.js";
import { useInsertionEffect } from "react";

const SALT_ROUNDS = 10;

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.validated;

    const existedUser = await findUserByEmail(email);
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await createUser(name, email, hashedPassword, "user");

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.validated;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  const isUserExist =await findUserByEmail(email)
  if(!isUserExist){
return res.status(400).json({message:"user not registered ,please register to log in "})

  }
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
//generate tokens acsses and refresh 
    const accessToken = generateAccessTokens(isUserExist);
    const refreshToken = generateRefreshTokens(isUserExist)
//should store the refresh tokens in db
await saveRefreshToken(isUserExist.userId,refreshToken)
////set tokens in cookies
setAccessTokenCookie(res,accessToken)
setRefreshTokenCookie(res,refreshToken)





    return res.status(2000).json({message:"logged in successfully",user:{userId:isUserExist.userId,name:isUserExist)
    }
    catch(err){


      return res.status(500).json({message:"internal server error in login"})
    }
  }


export const refreshToken =async(req,res)=>{

const token=req.cookies.refreshToken;

try{

if(!token){
return res.status(401).json({message:"no refresh token provided"})
const user =await findUserByEmail(decoded.email)


if(!user){

return res.status(401)P.json({message:"unauthorized,user not found "});


}
const newAccessTokens=generateAccessTokens(user)
setAccessTokenCookie(res,newAccessTokens)
res.json({message:"access token refreshed successfully"})
}
const  decoded =verifyRefreshTokens(token)
}
  catch(err){

return res.status(500).json({message:"internal server error in refresh token"})


  }
}

  












const acc
    );

    const { hashed_password: _pw, ...safeUser } = user;

    return res.json({ message: "Login successful", token, user: safeUser });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error in login" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.validated;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "oldPassword and newPassword are required" });
    }

    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from the old password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const updated = await updateUserPassword(userId, newHashedPassword);

    if (!updated) {
      return res.status(500).json({ message: "Failed to update password" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in changePassword" });
  }
};
