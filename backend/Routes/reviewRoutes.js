import { Router } from "express";
import { authUser } from "../Middlewares/authUser.js";
import {
  addReview,
  getAllReviews,
  getProductReviews,
  reviewLikeDislikeController,
} from "../Controllers/reviewController.js";

export const reviewRouter = Router();

reviewRouter.post("/add-review", authUser, addReview);
reviewRouter.get("/get-reviews/:productId", getProductReviews);
reviewRouter.get("/get-all-reviews", getAllReviews);
reviewRouter.patch(
  "/like-dislike/:reviewId",
  authUser,
  reviewLikeDislikeController
);
