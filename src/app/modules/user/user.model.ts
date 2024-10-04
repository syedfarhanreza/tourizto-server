import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Authentication",
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;