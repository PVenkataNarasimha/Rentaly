import React from 'react';
import './NewsPromo.css';

interface News {
  id: number;
  day: string;
  month: string;
  title: string;
  excerpt: string;
  image: string;
}

const newsData: News[] = [
  {
    id: 1,
    day: "10",
    month: "MAR",
    title: "Enjoy Best Travel Experience",
    excerpt: "Traveling is an enriching experience that allows us to explore new destinations, immerse ourselves in different cultures, and create lifelong memories.",
    image: "https://www.madebydesignesia.com/themes/rentaly/images/news/pic-blog-1.jpg"
  },
  {
    id: 2,
    day: "12",
    month: "MAR",
    title: "The Future of Car Rent",
    excerpt: "As technology continues to advance at a rapid pace, the car rental industry is poised for a transformative shift. The future of car rental promises..",
    image: "https://www.madebydesignesia.com/themes/rentaly/images/news/pic-blog-2.jpg"
  },
  {
    id: 3,
    day: "14",
    month: "MAR",
    title: "Holiday Tips For Backpacker",
    excerpt: "For adventure seekers and budget-conscious travelers, backpacking offers a thrilling and immersive way to explore the world. Whether you're embarking..",
    image: "https://www.madebydesignesia.com/themes/rentaly/images/news/pic-blog-3.jpg"
  }
];

const NewsPromo: React.FC = () => {
  return (
    <section className="news-section">
      <div className="news-container">
        
        {/* Header */}
        <div className="section-header">
          <span className="pill-badge">Latest From Us</span>
          <h2 className="section-title">News & Promo</h2>
          <p className="section-subtitle">
            Breaking news, fresh perspectives, and in-depth coverage - stay ahead with our latest news, insights, and analysis.
          </p>
        </div>

        {/* Grid */}
        <div className="news-grid">
          {newsData.map((item) => (
            <div className="news-card" key={item.id}>
              
              {/* Image Area */}
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="date-badge">
                  <span className="date-day">{item.day}</span>
                  <span className="date-month">{item.month}</span>
                </div>
              </div>

              {/* Content Area (Overlapping) */}
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-excerpt">{item.excerpt}</p>
                <button className="read-more-btn">Read More</button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPromo;
