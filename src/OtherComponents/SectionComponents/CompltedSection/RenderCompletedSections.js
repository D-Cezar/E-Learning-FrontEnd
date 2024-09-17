import React, { useState } from 'react';
import YouTubeEmbed from '../../YoutubeHandler';

const CompletedSection = React.memo(({ section }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="section" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                            <div
                className={`section-header completed-section-header`}
                onClick={toggleSection}
                >
                <h2>Chapter: {section.title} (Completed)</h2>
                </div>
            {isOpen && (
                <div className="section-content">
                    {section.videoSource ? (
                        <YouTubeEmbed src={section.videoSource} />
                    ) : (
                        <div
                            style={{
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#f0f0f0',
                                color: '#999',
                            }}
                        >
                            <p>Video content is not available</p>
                        </div>
                    )}
                    <p>{section.textSource}</p>
                    <p className="question-text green-background">Answer the questions below</p>
                    {section.questions && section.questions.length > 0 ? (
                        <div className="questions">
                            {section.questions.map((question) => (
                                <Question key={question.id} question={question} />
                            ))}
                        </div>
                    ) : (
                        <ForwardButton completedSection={true} />
                    )}
                </div>
            )}
        </div>
    );
});

const Question = ({ question }) => {
    return (
        <div className="question" style={{ marginBottom: '10px' }}>
            <p>{question.sectionQuestion}</p>
            {question.hint && <p>Hint: {question.hint}</p>}
            <input
                type="text"
                placeholder="This question has been answered"
                style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                disabled
            />
            <AnswerButton disabled />
        </div>
    );
};

const AnswerButton = ({ disabled }) => {
    return (
        <button
            style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "not-allowed"
            }}
            disabled
        >
            Submit Answer
        </button>
    );
};

const ForwardButton = ({ completedSection }) => {
    return (
        <button
            style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "not-allowed",
                marginTop: "20px",
            }}
            disabled
        >
            Confirm Section Completed
        </button>
    );
};

export default CompletedSection;
