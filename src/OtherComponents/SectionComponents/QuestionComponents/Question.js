import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import AnswerButton from './AnswerButton';

const Question = ({ question, answer, handleAnswerChange, onComplete, disabled }) => {
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        if (disabled && isCorrect) {
            setIsCorrect(true);
        }
    }, [disabled, isCorrect]);

    const handleInputChange = (event) => {
        const newAnswer = event.target.value;
        handleAnswerChange(question.id, newAnswer);  
    };

    const handleAnswerSubmission = (isAnswerCorrect) => {
        setIsCorrect(isAnswerCorrect);  
        onComplete(isAnswerCorrect);    
    };

    return (
        <div className="question">
            <p>{question.text}</p>
            {question.hint && <p>Hint: {question.hint}</p>}
            <input
                type="text"
                value={answer}
                onChange={handleInputChange}  
                placeholder="Type your answer here"
                style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                disabled={disabled}  
            />
            <AnswerButton
                questionId={question.id}
                answer={answer}
                onComplete={handleAnswerSubmission}  
                disabled={disabled}  
            />
        </div>
    );
};

export default Question;
