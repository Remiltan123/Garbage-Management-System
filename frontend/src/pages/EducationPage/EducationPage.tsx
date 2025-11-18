// import React from "react";
// import "./EducationPage.css"; // optional if using custom CSS

// // Sample data for articles and videos
// const articles = [
//     {
//         title: "Understanding Waste Classification",
//         description: "Learn the basics of classifying biodegradable and non-biodegradable waste.",
//         link: "https://www.bali.org.uk/news/understanding-waste-classification/",
//     },
//     {
//         title: "Recycling 101",
//         description: "Tips and best practices for recycling effectively at home and community.",
//         link: "https://en.wikipedia.org/wiki/Recycling",
//     },
//     {
//         title: "Composting for Beginners",
//         description: "How to convert organic waste into nutrient-rich compost for your garden.",
//         link: "https://www.epwn.org/composting?utm_source=google&utm_medium=cpc&utm_campaign=p-max-get-involved&utm_id=p-max-get-involved&utm_term=&utm_content=&gad_source=1&gad_campaignid=22903011495&gbraid=0AAAAAoi_haLUTVuNmfPNiNsCFMPIxdx9U&gclid=CjwKCAiAz_DIBhBJEiwAVH2XwMm70al5MIR45ByNcVz3pe3hUufortmqirQ5eBmJMlZY6d8hIclvFBoClF0QAvD_BwE",
//     },
//     {
//         title: "The Economic Case for Zero Waste",
//         description: "Discover how waste reduction strategies lead to massive cost savings and job creation for businesses.",
//         link: "https://www.nj.gov/dep/dshw/recycling/wastewise/njwwcasestudy.pdf",
//     },
//     {
//         title: "AI and Robotics in Waste Sorting",
//         description: "Exploring the new smart technologies that are revolutionizing recycling efficiency and reducing contamination.",
//         link: "https://www.rts.com/blog/smart-waste-management-technologies/",
//     },
//     {
//         title: "Global Outlook 2024: A Call for Circular Economy",
//         description: "Summary of the latest UN report on municipal solid waste generation and the push for waste avoidance.",
//         link: "https://www.unep.org/resources/global-waste-management-outlook-2024",
//     }
// ];

// const videos = [
//     {
//         title: "Waste Management Explained",
//         url: "https://www.youtube.com/embed/0ZiD_Lb3Tm0",
//     },
//     {
//         title: "TOP 10 WASTE MANAGEMENT PRACTICES TODAY",
//         url: "https://www.youtube.com/embed/KxEIjwmYuc0",
//     },
//     {
//         title: "4 Ways of Waste Management",
//         url: "https://www.youtube.com/embed/HgEo7YnvJs0",
//     },
//     {
//         title: "Plastic Pyrolysis: A Solution for Recycling Waste Plastics",
//         url: "https://www.youtube.com/embed/D0bTmWeMeWE",
//     },
//     {
//         title: "How it works - Waste-to-Energy",
//         url: "https://www.youtube.com/embed/O9pwV3JoqwA",
//     },
// ];

// const EducationPage = () => {
//     return (
//         <div className="education-main-container">
//             <div className="education-container">
//                 <h1 className="page-title">Raise Awareness Through Education</h1>
//                 <p className="page-description">
//                     Learn about waste classification, recycling, and sustainable living practices. Explore
//                     articles, videos, and resources to make a positive impact in your community.
//                 </p>

//                 <section className="articles-section">
//                     <h2>Articles</h2>
//                     <div className="articles-grid">
//                         {articles.map((article, index) => (
//                             <div className="article-card" key={index}>
//                                 <h3>{article.title}</h3>
//                                 <p>{article.description}</p>
//                                 <a
//                                     href={article.link}
//                                     className="read-more"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     Read More
//                                 </a>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 <section className="videos-section">
//                     <h2>Videos</h2>
//                     <div className="videos-grid">
//                         {videos.map((video, index) => (
//                             <div className="video-card" key={index}>
//                                 <iframe
//                                     width="100%"
//                                     height="200"
//                                     src={video.url}
//                                     title={video.title}
//                                     frameBorder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 ></iframe>
//                                 <p>{video.title}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default EducationPage;


import React, { useState } from "react";
import "./EducationPage.css"; // Ensure your custom CSS file is here

// Sample data for articles and videos
const articles = [
    {
        title: "Understanding Waste Classification",
        description: "Learn the basics of classifying biodegradable and non-biodegradable waste.",
        link: "https://www.bali.org.uk/news/understanding-waste-classification/",
    },
    {
        title: "Recycling 101",
        description: "Tips and best practices for recycling effectively at home and community.",
        link: "https://en.wikipedia.org/wiki/Recycling",
    },
    {
        title: "Composting for Beginners",
        description: "How to convert organic waste into nutrient-rich compost for your garden.",
        link: "https://www.epwn.org/composting?utm_source=google&utm_medium=cpc&utm_campaign=p-max-get-involved&utm_id=p-max-get-involved&utm_term=&utm_content=&gad_source=1&gad_campaignid=22903011495&gbraid=0AAAAAoi_haLUTVuNmfPNiNsCFMPIxdx9U&gclid=CjwKCAiAz_DIBhBJEiwAVH2XwMm70al5MIR45ByNcVz3pe3hUufortmqirqir5eBmJMlZY6d8hIclvFBoClF0QAvD_BwE",
    },
    {
        title: "The Economic Case for Zero Waste",
        description: "Discover how waste reduction strategies lead to massive cost savings and job creation for businesses.",
        link: "https://www.nj.gov/dep/dshw/recycling/wastewise/njwwcasestudy.pdf",
    },
    {
        title: "AI and Robotics in Waste Sorting",
        description: "Exploring the new smart technologies that are revolutionizing recycling efficiency and reducing contamination.",
        link: "https://www.rts.com/blog/smart-waste-management-technologies/",
    },
    {
        title: "Global Outlook 2024: A Call for Circular Economy",
        description: "Summary of the latest UN report on municipal solid waste generation and the push for waste avoidance.",
        link: "https://www.unep.org/resources/global-waste-management-outlook-2024",
    }
];

const videos = [
    {
        title: "Waste Management Explained",
        url: "https://www.youtube.com/embed/0ZiD_Lb3Tm0",
    },
    {
        title: "TOP 10 WASTE MANAGEMENT PRACTICES TODAY",
        url: "https://www.youtube.com/embed/KxEIjwmYuc0",
    },
    {
        title: "4 Ways of Waste Management",
        url: "https://www.youtube.com/embed/HgEo7YnvJs0",
    },
    {
        title: "Plastic Pyrolysis: A Solution for Recycling Waste Plastics",
        url: "https://www.youtube.com/embed/D0bTmWeMeWE",
    },
    {
        title: "How it works - Waste-to-Energy",
        url: "https://www.youtube.com/embed/O9pwV3JoqwA",
    },
];

// Sample data for the Community Pinboard (Can be dynamic later)
const communityTips = [
    { id: 1, tip: "I reuse old t-shirts as cleaning rags instead of buying paper towels!", user: "Ravi S." },
    { id: 2, tip: "Freezing banana peels before composting makes them break down faster. Try it!", user: "Aisha F." },
];

const EducationPage = () => {
    // State for the Quiz/Challenge feature
    const [isQuizActive, setIsQuizActive] = useState(false);

    // Placeholder function for the Quiz/Challenge
    const startQuiz = () => {
        setIsQuizActive(true);
        alert("Quiz Started! (Implement the quiz UI here)");
    };

    // Placeholder function for the Community Submission
    const submitTip = () => {
        alert("Submission Form Opened! (Implement form submission here)");
    };

    return (
        <div className="education-main-container">
            <div className="education-container">
                <h1 className="page-title">Raise Awareness Through Education</h1>
                <p className="page-description">
                    Learn about waste classification, recycling, and sustainable living practices. Explore
                    articles, videos, and resources to make a positive impact in your community.
                </p>

            
                <section className="impact-tracker-section" style={{
                    padding: '20px', 
                    margin: '30px 0', 
                    backgroundColor: '#e6ffe6', 
                    borderRadius: '8px'
                }}>
                    <h2>Our Collective Impact 🌱</h2>
                    <div className="impact-stats-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '20px',
                        textAlign: 'center'
                    }}>
                        <div className="stat-card">
                            <h3 style={{color: '#008000'}}>1,500+</h3>
                            <p>Households Registered</p>
                        </div>
                        <div className="stat-card">
                            <h3 style={{color: '#008000'}}>8,200 kg</h3>
                            <p>Waste Diverted This Week</p>
                        </div>
                        <div className="stat-card">
                            <h3 style={{color: '#008000'}}>90%</h3>
                            <p>Recycling Accuracy</p>
                        </div>
                    </div>
                </section>
                
                <hr />

            
                <section className="quiz-section" style={{
                    padding: '20px', 
                    margin: '30px 0', 
                    backgroundColor: '#fff0e6', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h2>Test Your Knowledge! 🧠</h2>
                    <p>See how well you know your biodegradable from your non-biodegradable waste.</p>
                    <button 
                        onClick={startQuiz} 
                        className="quiz-button"
                        style={{
                            padding: '10px 20px',
                            fontSize: '1em',
                            backgroundColor: '#ff9900',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Start The Waste Challenge
                    </button>
                    {isQuizActive && <p style={{marginTop: '10px'}}>Quiz UI goes here...</p>}
                </section>

                <hr />

             
                <section className="articles-section">
                    <h2>Articles</h2>
                    <div className="articles-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        {articles.map((article, index) => (
                            <div className="article-card" key={index} style={{
                                border: '1px solid #ccc',
                                padding: '15px',
                                borderRadius: '8px'
                            }}>
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                                <a
                                    href={article.link}
                                    className="read-more"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read More
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                <hr />

                {/* ----------------------------------------------------------- */}
                {/* VIDEOS SECTION */}
                {/* ----------------------------------------------------------- */}
                <section className="videos-section">
                    <h2>Videos</h2>
                    <div className="videos-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {videos.map((video, index) => (
                            <div className="video-card" key={index} style={{
                                border: '1px solid #ccc',
                                padding: '10px',
                                borderRadius: '8px'
                            }}>
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={video.url}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <p style={{fontWeight: 'bold', marginTop: '10px'}}>{video.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                <hr />

                {/* ----------------------------------------------------------- */}
                /* 3. COMMUNITY PINBOARD (Awareness Feature) */
                /* ----------------------------------------------------------- */
                <section className="community-board-section" style={{
                    padding: '20px', 
                    margin: '30px 0', 
                    backgroundColor: '#e6f5ff', 
                    borderRadius: '8px'
                }}>
                    <h2>Share Your Tips! 💡</h2>
                    <p>Inspire others! Submit your best local recycling or composting success story.</p>
                    <button 
                        onClick={submitTip} 
                        className="submit-button"
                        style={{
                            padding: '10px 20px',
                            fontSize: '1em',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '20px'
                        }}
                    >
                        Submit Your Awareness Tip
                    </button>
                    
                    <h3>Community Tips:</h3>
                    <div className="community-tips-list">
                        {communityTips.map(tip => (
                            <div key={tip.id} style={{
                                border: '1px dashed #007bff',
                                padding: '10px',
                                margin: '10px 0',
                                borderRadius: '5px'
                            }}>
                                <p style={{fontStyle: 'italic'}}>{`"${tip.tip}"`}</p>
                                <p style={{textAlign: 'right', fontSize: '0.9em', color: '#555'}}>- {tip.user}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default EducationPage;