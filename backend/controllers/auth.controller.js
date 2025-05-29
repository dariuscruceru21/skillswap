import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refreshToken:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); //7 days
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
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
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    //set cookies
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refreshToken:${decoded.userId}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({
      message: "Error logging out",
      error: error.message,
    });
  }
};

//refresh the acces token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedRefreshToken = await redis.get(`refreshToken:${decoded.userId}`);

    if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    
    // Store new refresh token in Redis
    await storeRefreshToken(user._id, newRefreshToken);

    // Set new cookies
    setCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

//TODO: implement getProfile controller
export const getProfile = async (req, res) => {
  try {
    // Use the authenticated user's id
    const user = await User.findById(req.user._id)
      .populate({
        path: "reviews.reviewerId",
        select: "name",
      })
      .populate({
        path: "passedQuizzes",
        populate: {
          path: "quiz",
          select: "skillTag title questions", // Select fields needed on frontend
        },
      })
      .lean();

    res.json(user);
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password -refreshToken').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || "user" // Default to "user" if role not specified
    });

    await user.save();

    // Return user without sensitive data
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    res.status(201).json(userResponse);
  } catch (error) {
    console.log("Error in createUser controller", error.message);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, occupation, education, languages, interests } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    if (occupation !== undefined) user.occupation = occupation;
    if (education !== undefined) user.education = education;
    if (languages !== undefined) user.languages = languages;
    if (interests !== undefined) user.interests = interests;

    await user.save();

    // Return updated user without sensitive data
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    res.json(userResponse);
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser controller", error.message);
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { id } = req.params; // User ID to whom the review is being added
    const { reviewerId, stars, comment } = req.body; // Review data from the request body

    // Find the user to whom the review is being added
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate review data (basic validation)
    if (!reviewerId || stars === undefined || !comment) {
       return res.status(400).json({ message: "Reviewer ID, stars, and comment are required" });
    }
    
    // Check if reviewer exists (optional but recommended)
    const reviewer = await User.findById(reviewerId);
    if (!reviewer) {
        return res.status(404).json({ message: "Reviewer not found" });
    }

    // Create the new review object
    const newReview = {
      reviewerId: reviewerId,
      stars: stars,
      comment: comment,
      date: new Date() // Automatically set the date
    };

    // Add the new review to the user's reviews array
    user.reviews.push(newReview);

    // Recalculate the average rating
    const totalStars = user.reviews.reduce((sum, review) => sum + review.stars, 0);
    user.rating = (totalStars / user.reviews.length).toFixed(1); // Calculate average and round to 1 decimal place

    // Save the updated user document
    await user.save();

    // Return the updated user or a success message
    // Populating reviews again to return the reviewer name in the response
    await user.populate('reviews.reviewerId', 'name');
    
    res.status(201).json(user);

  } catch (error) {
    console.log("Error in createReview controller", error.message);
    res.status(500).json({
      message: "Error adding review",
      error: error.message,
    });
  }
};

