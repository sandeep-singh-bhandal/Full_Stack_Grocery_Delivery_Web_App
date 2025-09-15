import { useState } from "react";

// Mock data for reviews
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
];

// Calculate rating statistics
const ratingStats = {
  average: 4.2,
  total: mockReviews.length,
  distribution: {
    5: mockReviews.filter((r) => r.rating === 5).length,
    4: mockReviews.filter((r) => r.rating === 4).length,
    3: mockReviews.filter((r) => r.rating === 3).length,
    2: mockReviews.filter((r) => r.rating === 2).length,
    1: mockReviews.filter((r) => r.rating === 1).length,
  },
};

// Star component
const Star = ({ filled, half = false }) => (
  <svg
    className={`w-5 h-5 ${
      filled
        ? "text-primary fill-current"
        : half
        ? "text-primary fill-current"
        : "text-gray-300"
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Star Rating Display
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

// Interactive Star Rating for Form
const InteractiveStarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="cursor-pointer"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
        >
          <Star filled={star <= (hoverRating || rating)} />
        </button>
      ))}
    </div>
  );
};

// Rating Bar Component
const RatingBar = ({ stars, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-12 text-muted-foreground">{stars} star</span>
      <div className="flex-1 bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-muted-foreground text-right">{count}</span>
    </div>
  );
};

export default function ReviewSection() {
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      // In a real app, this would submit to an API
      console.log("Submitting review:", newReview);
      alert("Thank you for your review!");
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-background mt-20">
      <h1 className="text-3xl font-semibold mb-6">Customer Reviews</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Rating Summary and Form */}
        <div className="space-y-8">
          {/* Average Rating Display */}
          <div className="bg-card text-card-foreground rounded-lg border border-gray-300 shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-foreground mb-2">
                {ratingStats.average}
              </div>
              <StarRating rating={ratingStats.average} />
              <p className="text-muted-foreground mt-2">
                Based on {ratingStats.total} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingBar
                  key={stars}
                  stars={stars}
                  count={ratingStats.distribution[stars]}
                  total={ratingStats.total}
                />
              ))}
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-card text-card-foreground rounded-lg border border-gray-300 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none "
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <InteractiveStarRating
                  rating={newReview.rating}
                  onRatingChange={(rating) =>
                    setNewReview({ ...newReview, rating })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  placeholder="Share your experience with this product..."
                  rows={4}
                  maxLength={500}
                  required
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none "
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {newReview.comment.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary-dull h-10 px-4 py-2 w-full"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Reviews List */}
        <div className="space-y-4">
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-card text-card-foreground rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-foreground leading-relaxed mb-3">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between">
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 6v4m-2 4h2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v11a2 2 0 002 2h2l3-3h6a2 2 0 002-2z"
                      />
                    </svg>
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="border border-gray-300 w-full rounded-lg py-2.5">Show more</button>
        </div>
      </div>
    </div>
  );
}
