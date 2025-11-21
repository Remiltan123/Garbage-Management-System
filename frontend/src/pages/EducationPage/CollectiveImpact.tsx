import React from "react";
import "./CollectiveImpact.css";

const CollectiveImpact = () => {
    return (
        <section className="collective-impact-section">
            <h2>Our Collective Impact 🌱</h2>
            <div className="impact-stats-grid">
                <div>
                    <h3>15+</h3>
                    <p>Households Registered</p>
                </div>
                <div>
                    <h3>8,20 kg</h3>
                    <p>Waste Diverted This Week</p>
                </div>
                <div>
                    <h3>90%</h3>
                    <p>Recycling Accuracy</p>
                </div>
            </div>
        </section>
    );
};

export default CollectiveImpact;
