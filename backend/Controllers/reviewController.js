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
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ productId })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.json({ success: true, reviews });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

export const reviewLikeDislikeController = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { action } = req.body;
    const { userId } = req.user;

    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }

    // --- LIKE toggle ---
    if (action === "like") {
      const alreadyLiked = review.likes.some(
        (id) => id.toString() === userId.toString()
      );
      if (alreadyLiked) {
        review.likes = review.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        review.dislikes = review.dislikes.filter(
          (id) => id.toString() !== userId.toString()
        );
        review.likes.push(userId);
      }
    }

    // --- DISLIKE toggle ---
    if (action === "dislike") {
      const alreadyDisliked = review.dislikes.some(
        (id) => id.toString() === userId.toString()
      );

      if (alreadyDisliked) {
        review.dislikes = review.dislikes.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        review.likes = review.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
        review.dislikes.push(userId);
      }
    }

    await review.save();

    res.json({
      success: true,
      message:
        action === "like"
          ? review.likes.some((id) => id.toString() === userId.toString())
            ? "Liked 👍"
            : "Like removed ❌"
          : review.dislikes.some((id) => id.toString() === userId.toString())
          ? "Disliked 👎"
          : "Dislike removed ❌",
      likesCount: review.likes.length,
      dislikesCount: review.dislikes.length,
      review,
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
