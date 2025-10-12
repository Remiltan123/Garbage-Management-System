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
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer found.");
    } catch (error) {
      setAnswer("Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-ai-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about waste recycling..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {answer && (
        <div className="ai-answer">
          <h3>AI Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};