import React, { useEffect } from 'react';
import Question from './QuestionComponents/Question';
import ForwardButton from '../SectionComponents/ForwardButton';
import YouTubeEmbed from '../YoutubeHandler';

const SectionDetails = ({ section, onComplete }) => {
  const [completionStatus, setCompletionStatus] = React.useState({});
  const [answers, setAnswers] = React.useState({});  
  const [isOpen, setIsOpen] = React.useState(false);

console.log(section);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleComplete = (questionId, isCorrect) => {
    setCompletionStatus((prevStatus) => ({
      ...prevStatus,
      [questionId]: isCorrect,
    }));
  };

  useEffect(() => {
    checkCompletion();
  }, [completionStatus]);

  const checkCompletion = () => {
    console.log("Checking completion status for ", section);
    const allAnsweredCorrectly = (section.questions || []).length > 0 && 
        (section.questions || []).every(
            (question) => completionStatus[question.id] === true
        );
    if (allAnsweredCorrectly) {
        onComplete();
    }
};


  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="section" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <div
        className={`section-header uncompleted-section-header`}
        onClick={toggleSection}
      >
        <h2>Chapter: {section.title}</h2>
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
          {section.questions && section.questions.length > 0 ? (
            <>
              <p style={{ 
                                backgroundColor: '#e60023', 
                                color: 'white', 
                                padding: '10px', 
                                margin: '0 -10px 10px -10px'
                            }}>
                Answer the questions below
              </p>
              <div className="questions">
                {section.questions.map((question) => (
                  <div key={question.id}>
                    <Question
                      question={question}
                      answer={answers[question.id] || ''}  
                      handleAnswerChange={handleAnswerChange}  
                      onComplete={(isCorrect) => handleComplete(question.id, isCorrect)}  
                      disabled={completionStatus[question.id]}  
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <ForwardButton onComplete={onComplete} />
          )}
        </div>
      )}
    </div>
  );
};

export default SectionDetails;
