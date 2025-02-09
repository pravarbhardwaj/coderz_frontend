import React, { useState } from "react";

const slides = [
  {
    id: 1,
    title: "SHIVANJLI 8 Coding A",
    text: "KAYAK 12321",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", // Python icon
  },
  {
    id: 2,
    title: "Example Slide 2",
    text: "EXAMPLE TEXT",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968267.png", // Placeholder icon
  },
  {
    id: 3,
    title: "Example Slide 3",
    text: "ANOTHER TEXT",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968282.png", // Placeholder icon
  },
];

 const Slider = () =>  {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-100">
      {/* Slide */}
      <div className="flex items-center justify-center w-full h-64">
        <div className="text-center">
          {/* Icon */}
          <div className="relative flex items-center justify-center mb-4">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-12 h-12 absolute top-[-20px] right-[-20px]"
            />
          </div>
          {/* Main Content */}
          <p className="text-lg font-semibold text-purple-600">
            {slides[currentSlide].text}
          </p>
          <p className="mt-2 text-sm font-bold text-gray-600">
            {slides[currentSlide].title}
          </p>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#9664;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        &#9654;
      </button>
    </div>
  );
}

export default Slider
