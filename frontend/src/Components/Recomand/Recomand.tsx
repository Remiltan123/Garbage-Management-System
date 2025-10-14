
import React, { useState } from "react";
import "./Recomand.css";
import { CircularProgress } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { FaMessage } from "react-icons/fa6";
import { askQuestion } from "../../utility/api";

interface QA {
  question: string;
  answer: string;
}

export const SearchAI: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [qaList, setQaList] = useState<QA[]>([]);

   const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userQuestion = query;
    setLoading(true);
    setQuery("");

    const answer = await askQuestion(userQuestion);

    setQaList((prev) => [...prev, { question: userQuestion, answer }]);
    setLoading(false);
  };

  return (
    <div className="ai-search-wrapper">
      <div className="ai-search-box">
        <h2>♻️ Ask anything and explore AI-powered insights on Waste and 3R solutions!</h2>

        {qaList.map((qa, index) => (
          <div key={index} className="ai-answer-card">
            <h3><FaMessage size={12}/> {qa.question}</h3>
            <h2>Answer:</h2>
            <div className="ai-answer-text">
              {qa.answer.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        <form onSubmit={handleSearch} className="ai-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask another question..."
            className="ai-input"
            disabled={loading}
          />
          <button type="submit" className="ai-btn" disabled={loading}>
            {loading ? (
              <div><CircularProgress color="inherit" size={20} thickness={4} style={{ transform: "scale(0.7)" }} /></div>
            ) : (
              <FiSearch color="white" size={20} />
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
