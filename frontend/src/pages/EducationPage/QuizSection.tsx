import React, { useState } from "react";
import "./QuizSection.css";

const QuizSection = () => {
    const [isQuizActive, setIsQuizActive] = useState(false);

    const startQuiz = () => {
        setIsQuizActive(true);
        alert("Quiz Started! (Implement the quiz UI here)");
    };

    return (
        <section className="quiz-section">
            <h2>Test Your Knowledge! 🧠</h2>
            <p>See how well you know your biodegradable from your non-biodegradable waste.</p>
            <button onClick={startQuiz} className="quiz-button">
                Start The Waste Challenge
            </button>
            {isQuizActive && <p className="quiz-active-text">Quiz UI goes here...</p>}
        </section>
    );
};

export default QuizSection;
