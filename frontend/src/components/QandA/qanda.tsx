import { useState } from "react";
import "./qanda.css";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "How do I get started with Car Rental?",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores..."
  },
  {
    question: "Can I rent a car with a debit card??", // Added double ?? from image
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores..."
  },
  {
    question: "What kind of Car Rental do I need?",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores..."
  },
  {
    question: "What is a rental car security deposit?",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores..."
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores..."
  },
  {
    question: "Is it possible to extend my rental period?",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores..."
  }
];

const FaqItem: React.FC<{ item: Faq }> = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? "active" : ""}`}>
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <p>{item.question}</p>
        <span className={`icon ${open ? "open" : ""}`}>
          {/* SVG Chevron for cleaner look */}
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="white"/>
          </svg>
        </span>
      </div>
      {open && <div className="faq-answer">{item.answer}</div>}
    </div>
  );
};

const Faq: React.FC = () => {
  return (
    <div className="page-wrapper">
      {/* FAQ Section */}
      <section className="faq-section">
        <span className="faq-tag">Do You Have</span>
        <h2 className="faq-title">Any Questions?</h2>

        <div className="faq-grid">
          {faqs.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </section>

      {/* New Customer Care Banner */}
      <section className="call-banner">
        <div className="call-container">
          
          <div className="call-left">
            <span className="call-tag">Call us for further information</span>
            <h2 className="call-heading">
              Rentaly customer care <br />
              is here to help you <br />
              anytime.
            </h2>
          </div>

          <div className="call-right">
            <div className="call-icon-circle">
               {/* Phone SVG Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.01 15.38C18.81 15.41 17.61 15.23 16.47 14.85C16.11 14.73 15.71 14.82 15.43 15.1L13.16 17.37C10.36 15.93 8.08 13.65 6.64 10.84L8.91 8.57C9.18 8.3 9.27 7.9 9.15 7.53C8.77 6.39 8.59 5.19 8.62 3.99C8.63 3.44 8.19 3 7.64 3H4.06C3.51 3 3.05 3.45 3.06 4C3.16 13.43 10.59 20.85 20.02 20.94C20.57 20.95 21.02 20.49 21.02 19.94V16.36C21.02 15.81 20.58 15.37 20.01 15.38Z" fill="#1dbf08"/>
              </svg>
            </div>
            <p className="call-label">CALL US NOW</p>
            <h3 className="call-number">1 200 333 800</h3>
            <button className="call-btn">Contact Us</button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Faq;
