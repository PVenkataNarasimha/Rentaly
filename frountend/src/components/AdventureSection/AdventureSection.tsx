import React from 'react';
import './AdventureSection.css';

// --- SVG Icons ---
const TrophyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 3h2v6h-2V7zm0 8h2v2h-2v-2z" opacity="0"/><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
);

const RoadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M18 2h2v20h-2zM4 2h2v20H4zm6 0h2v4h-2zm0 8h2v4h-2zm0 8h2v4h-2z"/>
  </svg>
);

const MapPinIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
);

// --- Feature Data ---
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <TrophyIcon />,
    title: "First Class Services",
    description: "Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation."
  },
  {
    icon: <RoadIcon />,
    title: "24/7 road assistance",
    description: "Reliable support when you need it most, keeping you on the move with confidence and peace of mind."
  },
  {
    icon: <MapPinIcon />,
    title: "Free Pick-Up & Drop-Off",
    description: "Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience."
  }
];

const AdventureSection: React.FC = () => {
  return (
    <section className="adventure-section">
      {/* Dark Overlay */}
      <div className="overlay"></div>
      
      <div className="content-container">
        {/* Left Column */}
        <div className="left-column">
          <h1 className="main-heading">Let's Your Adventure Begin</h1>
        </div>

        {/* Right Column with Features */}
        <div className="right-column">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <div className="icon-box">
                {feature.icon}
              </div>
              <div className="text-box">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdventureSection;
