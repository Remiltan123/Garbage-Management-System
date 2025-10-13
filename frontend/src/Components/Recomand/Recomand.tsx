import React, { useState } from "react";
import "./Recomand.css";

export const SearchAI: React.FC = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:3000/api/ask/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer found.");
    } catch (error) {
      setAnswer("⚠️ Error fetching answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-search-wrapper">
      <div className="ai-search-box">
        <h2>♻️ Ask AI about Waste & Recycling</h2>

        <form onSubmit={handleSearch} className="ai-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g. How can I recycle glass bottles?"
            className="ai-input"
          />
           <button type="submit" className="ai-btn" disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </form>

        {loading && (
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        {answer && !loading && (
          <div className="ai-answer-card">
            <h3>🤖 AI Answer</h3>
            <div className="ai-answer-text">
              {answer.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
