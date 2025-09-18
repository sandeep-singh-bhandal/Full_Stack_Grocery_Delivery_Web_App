import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { assets } from "../assets/assets";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const StarRating = ({ rating, size = "default" }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} filled={true} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} half={true} />);
      } else {
        stars.push(<Star key={i} filled={false} />);
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  };

export default function AllReviewDisplayModal() {
  const { setShowReviewModal, mockReviews } = useAppContext();
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
              key={review._id}
              className="bg-card text-card-foreground rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex gap-1 items-center mb-2">
                    <img src={assets.profile_icon} alt="dp" className="h-7" />
                    <h4 className="font-medium text-foreground">
                      {review.userId.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.createdAt)}
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
