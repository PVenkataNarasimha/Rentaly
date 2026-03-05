import './StatsSection.css';

const StatsSection: React.FC = () => {
  return (
    <section className="stats-section">
      <div className="stats-overlay"></div>

      <div className="stats-content">
        {/* LEFT TEXT */}
        <div className="stats-text">
          <h2>
            We offer customers a wide range of{" "}
            <span>commercial cars</span> and{" "}
            <span>luxury cars</span> for any occasion.
          </h2>
        </div>

        {/* RIGHT TEXT */}
        <div className="stats-description">
          <p>
            At our car rental agency, we believe that everyone deserves to
            experience the pleasure of driving a reliable and comfortable
            vehicle, regardless of their budget.
          </p>
          <p>
            We have curated a diverse fleet of well-maintained cars, ranging
            from sleek sedans to spacious SUVs, all at competitive prices.
            With our streamlined rental process, you can quickly and
            conveniently reserve your desired vehicle.
          </p>
        </div>
      </div>

      {/* STATS BOXES */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>15425</h3>
          <p>Completed Orders</p>
        </div>

        <div className="stat-card">
          <h3>8745</h3>
          <p>Happy Customers</p>
        </div>

        <div className="stat-card">
          <h3>235</h3>
          <p>Vehicles Fleet</p>
        </div>

        <div className="stat-card">
          <h3>15</h3>
          <p>Years Experience</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
