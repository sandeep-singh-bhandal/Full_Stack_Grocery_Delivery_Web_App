import jwt from "jsonwebtoken";

//Seller Login - /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Log in Successfully" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

//Check Seller Auth - api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Logout Seller - /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
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
