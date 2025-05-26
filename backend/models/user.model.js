import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  skillTags: [String],
  skillTested: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String, // Cloudinary URL or base64
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      stars: Number,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cartItems:[
    {
      quantity:{
        type:Number,
        default: 1
      },
      listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
      }
    }
  ]
});



//Pre-save hook to hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }catch (error) {
   next(error);
  }
});


userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
