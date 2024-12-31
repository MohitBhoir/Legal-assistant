import { useState, useEffect } from "react";

const reviews = [
  {
    name: "John Doe",
    email: "john@example.com",
    review: "This product is amazing! Highly recommended. I absolutely love the quality and the performance. Worth every penny! I will definitely buy again and recommend it to my friends. It works like a charm, and the design is top-notch. I couldn't be happier with my purchase. Overall, a great investment. The customer service was excellent, and I am very pleased with my experience. A must-buy for anyone looking for a reliable product.",
    starCount: 5,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    review: "Good quality, but could use some improvements. Overall, a solid product, but there are some areas for enhancement. The build is nice, and the functionality works well, but the user interface could be better. I believe the product has great potential, but it needs a few tweaks. I would still recommend it, though. I hope future versions address these issues, as I believe this product has great potential.",
    starCount: 3,
  },
  {
    name: "Samuel Lee",
    email: "samuel@example.com",
    review: "Excellent! I love it! This product exceeded my expectations in every way. Great value for money. I would highly recommend it to anyone looking for a reliable and affordable solution. It is exactly what I was looking for, and it works perfectly. It’s very easy to use, and the customer support is outstanding. I am very satisfied with my purchase. It's well-designed and works flawlessly, providing excellent performance at a competitive price.",
    starCount: 4,
  },
];

const StarRating = ({ count }) => {
  return (
    <div className="flex items-center justify-center space-x-0.5 mt-2">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={index < count ? "#FFD700" : "#d1d5db"}
          className="w-5 h-5"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </div>
  );
};

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hover, setHover] = useState(false);

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hover) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [hover]);

  // Go to previous slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  // Go to next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  // Manually go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="w-full relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Carousel Wrapper */}
      <div className="relative overflow-hidden">
        {/* Review Cards Container */}
        <div className="flex justify-center items-center space-x-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-white bg-opacity-30 backdrop-blur-lg  rounded-2xl h-auto max-w-4xl p-6 transition-all duration-700 ease-in-out ${
                index === currentIndex ? "block" : "hidden"
              }`}
            >
              <div className="text-center relative">
                <span className="text-3xl font-semibold text-indigo-600">{review.name}</span>
                <div className="mt-2 text-sm text-indigo-500">{review.email}</div>
                <StarRating count={review.starCount} />
                <div className="mt-4 text-lg text-gray-700 break-words">{review.review}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (appear on hover) */}
      {hover && (
        <>
          <div className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10">
            <button
              onClick={goToPrevious}
              className="group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600"
            >
              <svg
                className="h-5 w-5 text-indigo-600 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10">
            <button
              onClick={goToNext}
              className="group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600"
            >
              <svg
                className="h-5 w-5 text-indigo-600 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Slide Indicator Circles (Outside of Slides) */}
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-indigo-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
