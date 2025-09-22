import UserModel from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AddressModel from "../Models/Address.js";
import z from "zod";
import transporter from "../Config/nodemailer.js";
import ReviewModel from "../Models/Reviews.js";

//Registering User - /api/user/register
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Checking if user already exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User Already Exists" });

    // Creating the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // prevent JS to access the cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
    });
    return res.json({
      success: true,
      message: "Account Successfully Created",
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

//Login User - /api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "Incorrect Email and Password ",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Incorrect Email or Password ",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      message: "Log in Successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

//Check Auth - /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await UserModel.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Logout User - /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out Successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Delete User - /api/user/delete
export const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    await UserModel.findByIdAndDelete(userId);
    await AddressModel.deleteMany({ userId });
    await ReviewModel.deleteMany({ userId });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Account Deleted Successfully" });
  } catch (error) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Get User - /api/user/get-user
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await UserModel.findById(userId);
    const userAddresses = await AddressModel.find({ userId });
    const userDetails = [user, userAddresses];
    res.json({ success: true, user: userDetails });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Update User - /api/user/update-user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { email, username, phone, addresses } = req.body;
    await UserModel.findByIdAndUpdate(userId, { email, name: username, phone });
    const existingAddressesIds = (
      await AddressModel.find({ userId }).select("_id")
    ).map((objId) => objId._id.toString());

    const incomingAddressesIds = addresses.map((add) => {
      return add._id;
    });

    const deletedAddressesIds = existingAddressesIds.filter(
      (id) => !incomingAddressesIds.includes(id?.toString())
    );

    deletedAddressesIds.map(
      async (id) => await AddressModel.deleteOne({ _id: id })
    );

    addresses.map(async (add) => {
      await AddressModel.findByIdAndUpdate(add._id, { ...add });
    });
    res.json({ success: true, message: "Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

export const requestCode = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = z.object({
      email: z.email("Enter an valid email"),
    });
    const result = checkEmail.safeParse({ email });
    if (!result.success) {
      const errors = result.error.issues;
      return res.json({ success: false, errors: errors });
    }
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    const code = Math.floor(100000 + Math.random() * 900000);
    await UserModel.findOneAndUpdate(
      { email },
      { resetCode: code, resetCodeExpireAt: Date.now() + 15 * 60 * 1000 }
    );
    await transporter.sendMail({
      from: `"GreenCart Admin" <mr.money.bhandal@gmail.com>`,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is ${code}.\nUse this to reset your password, the code is valid for 15 minutes only.`,
    });

    res.json({ success: true, message: "Code sent successfully" });
  } catch (err) {
    res.json({ success: false, error: err.message });
    console.log(err.message);
  }
};
export const verifyCode = async (req, res) => {
  try {
    const { code, email } = req.body;
    if (!code || code.length < 6) {
      return res.json({
        success: false,
        message: "Please enter the 6 digit code",
      });
    }
    const user = await UserModel.findOne({ email });
    if (user.resetCode === "" || user.resetCode !== code) {
      return res.json({
        success: false,
        message: "Incorrect code",
      });
    }
    if (user.resetCodeExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Code Expired",
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    res.cookie("passwordResetToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "Code verified successfully" });
  } catch (err) {
    res.json({ success: false, error: err.message });
    console.log(err.message);
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword, resetCode: "", resetCodeExpireAt: "" }
    );
    res.clearCookie("passwordResetToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.json({ success: false, error: err.message });
    console.log(err.message);
  }
};
