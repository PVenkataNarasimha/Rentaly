import React from 'react';
import './Testimonials.css';

interface Testimonial {
  id: number;
  title: string;
  text: string;
  name: string;
  image: string;
}

// Data extracted exactly from your screenshot
const testimonialData: Testimonial[] = [
  {
    id: 1,
    title: "Excellent Service! Car Rent Service!",
    text: "I have been using Rentaly for my Car Rental needs for over 5 years now. I have never had any problems with their service. Their customer support is always responsive and helpful. I would recommend Rentaly to anyone looking for a reliable Car Rental provider.",
    name: "Stepanie Hutchkiss",
    // Placeholder image resembling the first card (Woman in car)
    image: "https://www.madebydesignesia.com/themes/rentaly/images/testimonial/1.jpg"
  },
  {
    id: 2,
    title: "Excellent Service! Car Rent Service!",
    text: "We have been using Rentaly for our trips needs for several years now and have always been happy with their service. Their customer support is Excellent Service! and they are always available to help with any issues we have. Their prices are also very competitive.",
    name: "Jovan Reels",
    // Placeholder image resembling the second card (Man smiling)
    image: "https://www.madebydesignesia.com/themes/rentaly/images/testimonial/2.jpg"
  },
  {
    id: 3,
    title: "Excellent Service! Car Rent Service!",
    text: "Endorsed by Industry experts, Rentaly is the Car Rental solution you can trust. With years of experience in the field, we provide fast, reliable and secure Car Rental services.",
    name: "Kanesha Keyton",
    // Placeholder image resembling the third card (Man in red shirt/sunglasses)
    image: "https://www.madebydesignesia.com/themes/rentaly/images/testimonial/3.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="testimonial-container">
      {testimonialData.map((card) => (
        <div key={card.id} className="card">
          <img src={card.image} alt={card.name} className="card-bg" />
          <div className="card-overlay"></div>
          <div className="card-content">
            <div className="quote-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 7.55228 5.01697 7V3H10.017C11.6738 3 13.017 4.34315 13.017 6V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
              </svg>
            </div>

            <h3 className="card-title">{card.title}</h3>
            <p className="card-text">{card.text}</p>

            <div className="card-author">
              <span className="author-dash">—</span>
              <span className="author-name">{card.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
