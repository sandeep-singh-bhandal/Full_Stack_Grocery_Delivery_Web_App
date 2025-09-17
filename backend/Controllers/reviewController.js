import ReviewModel from "../Models/Reviews.js";

export const addReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Product ID, rating, and comment are required",
      });
    }
    await ReviewModel.create({ userId, productId, rating, comment });
    res.json({ success: true, message: "Review added" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

export const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  const review = await ReviewModel.find({ productId });

  res.json({ success: true, review });
};
