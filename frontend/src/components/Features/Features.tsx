import './Features.css';
import {
    FaTrophy,
    FaRoad,
    FaTag,
    FaMapMarkerAlt,
} from "react-icons/fa"

const Features: React.FC = () => {
    return (
        <section className="features-section">
            <div className="features-header">
                <span className="badge">Why Choose Us</span>
                <h2>Our Features</h2>
                <p>
                    Discover a world of convenience, safety, and customization, paving the
                    way for unforgettable adventures and seamless mobility solutions.
                </p>
            </div>

            <div className="features-content">
                {/* LEFT FEATURES */}
                <div className="features-column">
                    <div className="feature-item">
                        <div className="icon-box">
                            <FaTrophy />
                        </div>
                        <div>
                            <h4>First class services</h4>
                            <p>
                                Where luxury meets exceptional care, creating unforgettable moments
                                and exceeding your every expectation.
                            </p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <div className="icon-box">
                            <FaRoad />
                        </div>
                        <div>
                            <h4>24/7 road assistance</h4>
                            <p>
                                Reliable support when you need it most, keeping you on the move with
                                confidence and peace of mind.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CENTER IMAGE */}
                <div className="features-image">
                    <img
                        src="src/Imgs/Features-imgs/download.png"
                        alt="Car"
                    />
                </div>

                {/* RIGHT FEATURES */}
                <div className="features-column">
                    <div className="feature-item right">
                        <div>
                            <h4>Quality at Minimum Expense</h4>
                            <p>
                                Unlocking affordable brilliance with elevating quality while
                                minimizing costs for maximum value.
                            </p>
                        </div>
                        <div className="icon-box">
                            <FaTag />
                        </div>
                    </div>

                    <div className="feature-item right">
                        <div>
                            <h4>Free Pick-Up & Drop-Off</h4>
                            <p>
                                Enjoy free pickup and drop-off services, adding an extra layer of
                                ease to your car rental experience.
                            </p>
                        </div>
                        <div className="icon-box">
                            <FaMapMarkerAlt />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Features;
