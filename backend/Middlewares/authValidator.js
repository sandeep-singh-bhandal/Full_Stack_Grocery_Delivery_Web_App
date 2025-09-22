import { loginSchema } from "validation";
import { newPasswordSchema } from "validation";
import { registerSchema } from "validation";
import { updateDetailsSchema } from "validation";

//Registration Validation Middleware
export const registerValidator = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name)
    return res.json({
      success: false,
      message: "Name is required",
    });
  if (!email)
    return res.json({
      success: false,
      message: "Email is required",
    });
  if (!password)
    return res.json({
      success: false,
      message: "Password is required",
    });
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues;
      return res.json({ success: false, errors: errors });
    }
    req.body = result.data;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Login Validation Middleware
export const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email)
    return res.json({
      success: false,
      message: "Email is required",
    });
  if (!password)
    return res.json({
      success: false,
      message: "Password is required",
    });
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues;
      return res.json({ success: false, errors: errors });
    }
    req.body = result.data;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Update User Details Validation Middleware
export const updateDetailsValidator = async (req, res, next) => {
  const { email, name, phone, addresses } = req.body;
  if (!email)
    return res.json({
      success: false,
      message: "Please provide an Email",
    });
  if (!name)
    return res.json({
      success: false,
      message: "Please provide a Name",
    });
  if (
    addresses.length > 0 &&
    addresses.every((add) => add.isDefault === false)
  ) {
    addresses[0].isDefault = true;
  }
  try {
    const result = updateDetailsSchema.safeParse({
      email,
      username: name,
      phone,
    });
    if (!result.success) {
      const errors = result.error.issues;
      return res.json({ success: false, errors: errors });
    }
    req.body = { ...result.data, phone, addresses };
    next();
  } catch (error) {
    console.log(error);
  }
};

// Validation for resetting the password to a new password
export const newPasswordValidator = async (req, res, next) => {
  const { newPassword, confirmNewPassword, email } = req.body;
  if (!newPassword)
    return res.json({
      success: false,
      message: "Please set a new password",
    });
  if (!confirmNewPassword)
    return res.json({
      success: false,
      message: "Please confirm your password",
    });
  try {
    const result = newPasswordSchema.safeParse({
      newPassword,
      confirmNewPassword,
    });
    if (!result.success) {
      const errors = result.error.issues;
      return res.json({ success: false, errors: errors });
    }
    req.body = { newPassword: result.data.newPassword, email };
    next();
  } catch (error) {
    console.log(error);
  }
};
