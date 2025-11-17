import React from "react";
import "./EducationPage.css"; // optional if using custom CSS

// Sample data for articles and videos
const articles = [
    {
        title: "Understanding Waste Classification",
        description: "Learn the basics of classifying biodegradable and non-biodegradable waste.",
        link: "#",
    },
    {
        title: "Recycling 101",
        description: "Tips and best practices for recycling effectively at home and community.",
        link: "#",
    },
    {
        title: "Composting for Beginners",
        description: "How to convert organic waste into nutrient-rich compost for your garden.",
        link: "#",
    },
];

const videos = [
    {
        title: "Waste Management Explained",
        url: "https://www.youtube.com/embed/5G2QyFfBjaI",
    },
    {
        title: "Plastic Pollution Awareness",
        url: "https://www.youtube.com/embed/tz8CmYxM8d4",
    },
];

const EducationPage = () => {
    return (
        <div className="education-main-container">
            <div className="education-container">
                <h1 className="page-title">Raise Awareness Through Education</h1>
                <p className="page-description">
                    Learn about waste classification, recycling, and sustainable living practices. Explore
                    articles, videos, and resources to make a positive impact in your community.
                </p>

                <section className="articles-section">
                    <h2>Articles</h2>
                    <div className="articles-grid">
                        {articles.map((article, index) => (
                            <div className="article-card" key={index}>
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <a href={article.link} className="read-more">
                                    Read More
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="videos-section">
                    <h2>Videos</h2>
                    <div className="videos-grid">
                        {videos.map((video, index) => (
                            <div className="video-card" key={index}>
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={video.url}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <p>{video.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EducationPage;
