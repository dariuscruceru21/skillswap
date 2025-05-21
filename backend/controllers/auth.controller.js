import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
  const accesToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accesToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); //7 days
};

const setCookies = (res, accesToken, refreshToken) => {
  res.cookie("accessToken", accesToken, {
    httpOnly: true, //prevent XXS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent CSRF attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  //desktop app => postman
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    //authenticate user using jwt with redis database
    const { accesToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    //set cookies
    setCookies(res, accesToken, refreshToken);

    res.status(201).json({
      user: {
       _id:user._id,
       name:user.name,
       email:user.email,
       role:user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  res.send("Sign in Route called");
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        await redis.del(`refreshToken:${decoded.userId}`);
    }
    res.clearCookie("accesToken");
    res.clearCookie("refreshToken");
    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error.message,
    });
  }
};
