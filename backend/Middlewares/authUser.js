import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.json({ success: false, message: "Not Authorized" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.id) {
      req.user = {userId: decodedToken.id};
    } else {
      res.json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
