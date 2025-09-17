import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { StarRating } from "./ReviewSection";
import { assets } from "../assets/assets";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love this product! The quality exceeded my expectations and it arrived quickly. Highly recommend!",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    comment:
      "Great product overall. Good value for money. Only minor issue was the packaging could be better.",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    comment:
      "Perfect! Exactly what I was looking for. The customer service was also excellent when I had questions.",
    date: "2024-01-08",
    helpful: 15,
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
  {
    id: 5,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
  {
    id: 6,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
  {
    id: 7,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
  {
    id: 8,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
  {
    id: 9,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
  {
    id: 10,
    name: "David Wilson",
    rating: 3,
    comment:
      "Decent product but took longer to arrive than expected. Quality is good though.",
    date: "2024-01-05",
    helpful: 3,
  },
];

export default function AllReviewDisplayModal() {
  const { setShowReviewModal } = useAppContext();
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="fixed inset-0 z-30 flex text-sm text-gray-600 h-full w-full bg-black/40 justify-center items-center backdrop-blur-sm"
      onClick={() => setShowReviewModal(false)}
    >
      <div
        className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-3/5 w-[370px] h-[500px] border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable reviews container */}
        <div className="relative w-full space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <LiaTimesSolid
            className="absolute cursor-pointer right-5 top-2 scale-150"
            onClick={() => setShowReviewModal(false)}
          />
          <h1 className="text-3xl mb-5">Customer Reviews</h1>
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card text-card-foreground rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex gap-1 items-center mb-2">
                    <img src={assets.profile_icon} alt="dp" className="h-7" />
                    <h4 className="font-medium text-foreground">
                      {review.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {/* {formatDate(review.date)} */}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-foreground leading-relaxed mb-3">
                {review.comment}
              </p>

              <div className="flex items-center gap-3">
                <button className="cursor-pointer text-sm text-muted-foreground transition-colors flex items-center gap-1">
                  <AiOutlineLike />
                  {review.helpful}
                </button>
                <button className="cursor-pointer text-sm text-muted-foreground transition-colors flex items-center gap-1">
                  <AiOutlineDislike />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
