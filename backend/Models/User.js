import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    cartItems: {
      type: Object,
      default: {},
    },
    resetCode: {
      type: String,
      required: true,
    },
    resetCodeExpireAt: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;
