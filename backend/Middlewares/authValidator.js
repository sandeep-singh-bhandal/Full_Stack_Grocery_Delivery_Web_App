import { z } from "zod";

// Validation for Registration
const registerSchema = z
  .object({
    name: z.string().min(3, "Name too short"),
    email: z.email("Enter an valid email"),
    password: z
      .string()
      .min(8, "Password must be 8 character long")
      .max(24, "Password must be less than 24 character")
      .regex(/[A-Z]/, "Password must contain a Capital Letter")
      .regex(/[a-z]/, "Password must contain a Small Letter")
      .regex(/[0-9]/, "Password must contain a Number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a Special Character")
      .regex(/^\S*$/, "Password should not contain any spaces"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password do not match",
      });
    }
  });

// Validation for Login
const loginSchema = z.object({
  email: z.email("Enter an valid email").toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be 8 character long")
    .max(24, "Password must be less than 24 character"),
});

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
