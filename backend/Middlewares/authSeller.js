import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY);
    if (decodedToken.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      res.json({ success: false, message: "Not Authorized" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
