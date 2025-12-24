import React, { useState } from "react";
import "./Carousel.css";

interface Car {
  id: number;
  name: string;
  price: number;
  likes: number;
  type: string;
  passengers: number;
  luggage: number;
  doors: number;
  image: string;
}

interface CarouselProps {
  vehicles: Car[];
}

const Carousel: React.FC<CarouselProps> = ({ vehicles }) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [likedCars, setLikedCars] = useState<{ [key: number]: boolean }>({});

  const visibleCards = 3;
  const maxIndex = vehicles.length - visibleCards;

  const handleNext = () => {
    if (startIndex < maxIndex) setStartIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(prev => prev - 1);
  };

  const toggleLike = (id: number) => {
    setLikedCars(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="fleet-section">
      <div className="fleet-header">
        <span className="pill-badge">Enjoy Your Ride</span>
        <h2 className="title">Our Vehicle Fleet</h2>
        <p className="subtitle">
          Driving your dreams to reality with an exquisite fleet of versatile vehicles.
        </p>
      </div>

      <div className="carousel-container">
        <button
          className={`nav-btn prev ${startIndex === 0 ? "disabled" : ""}`}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          &#10094;
        </button>

        <div className="cards-window">
          <div
            className="cards-track"
            style={{ transform: `translateX(-${startIndex * (100 / visibleCards)}%)` }}
          >
            {vehicles.map(car => {
              const isLiked = !!likedCars[car.id];
              const displayLikes = isLiked ? car.likes + 1 : car.likes;

              return (
                <div className="car-card" key={car.id}>
                  <div className="image-wrapper">
                    <img src={car.image} alt={car.name} />
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <h3>{car.name}</h3>
                      <div
                        className="like-container"
                        onClick={() => toggleLike(car.id)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className={`heart-icon ${isLiked ? "liked" : ""}`}
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                          2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                          C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
                          22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="like-count">{displayLikes}</span>
                      </div>
                    </div>

                    <div className="specs-row">
                      <span>{car.passengers}</span>
                      <span>{car.luggage}</span>
                      <span>{car.doors}</span>
                      <span>{car.type}</span>
                    </div>

                    <hr className="divider" />

                    <div className="card-footer">
                      <div className="price-block">
                        <span className="price-label">Daily rate from</span>
                        <span className="price-value">${car.price}</span>
                      </div>
                      <button className="rent-btn">Rent Now</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`nav-btn next ${startIndex === maxIndex ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={startIndex === maxIndex}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default Carousel;
export type { Car };
