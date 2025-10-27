import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    "https://www.leadsquared.com/wp-content/uploads/2021/11/what-is-contact-manager.png",
    "https://images.unsplash.com/photo-1709715357479-591f9971fb05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNtYXJ0JTIwY29udGFjdCUyMG1hbmFnZXJ8ZW58MHx8MHx8fDA%3D",
    "https://thumbs.dreamstime.com/b/business-marketing-people-phone-call-asian-indian-working-women-smart-girl-tablet-smartphone-contact-green-park-outdoor-342887938.jpg",
    "https://www.shutterstock.com/image-photo/portrait-attractive-trendy-cheerful-girl-600nw-2161154411.jpg"
  ];

  const nextImage = () => {
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="w-[80%] mx-auto h-[500px] mt-10 rounded-lg overflow-hidden shadow-lg relative">
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-all duration-500 ease-in-out h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#60;
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
