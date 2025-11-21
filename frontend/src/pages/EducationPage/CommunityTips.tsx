import React, { useState } from "react";
import "./CommunityTips.css";

interface Tip {
    id: number;
    tip: string;
    user: string;
}

interface CommunityTipsProps {
    tips: Tip[];
}

const CommunityTips: React.FC<CommunityTipsProps> = ({ tips: initialTips }) => {
    const [tips, setTips] = useState<Tip[]>(initialTips);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTip, setNewTip] = useState("");
    const [newUser, setNewUser] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewTip("");
        setNewUser("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTip.trim() === "" || newUser.trim() === "") return;

        const tipObj: Tip = {
            id: Date.now(), // simple unique id
            tip: newTip,
            user: newUser
        };

        setTips([tipObj, ...tips]);
        closeModal();
    };

    return (
        <section className="community-tips-section">
            <h2>Share Your Tips! 💡</h2>
            <p>Inspire others! Submit your best local recycling or composting success story.</p>

            <div className="submit-tip-button-container">
                <button onClick={openModal}>Submit Your Awareness Tip</button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Submit Your Tip</h3>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                placeholder="Enter your tip..."
                                value={newTip}
                                onChange={(e) => setNewTip(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={newUser}
                                onChange={(e) => setNewUser(e.target.value)}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <h3>Community Tips:</h3>
            <div className="tips-list">
                {tips.map((tip: Tip) => (
                    <div key={tip.id} className="tip-card">
                        <p className="tip-text">{`"${tip.tip}"`}</p>
                        <p className="tip-user">- {tip.user}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommunityTips;
