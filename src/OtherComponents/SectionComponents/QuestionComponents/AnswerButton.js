import React from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PostAnswer } from './BackEndComunications';

const AnswerButton = ({ questionId, answer, onComplete, disabled }) => {

    const handleAnswer = async () => {
        try {
            const response = await PostAnswer({ questionId, givenAnswer: answer });

            if (response) {
                toast.success('Answer submitted successfully!', {
                    icon: '✅',
                });
                onComplete(true);
            } else {
                toast.error('Answer was incorrect.', {
                    icon: '❌',
                });
                onComplete(false);
            }
        } catch (error) {
            toast.error('Error submitting answer.', {
                icon: '❌',
            });
            onComplete(false);
        }
    };

    return (
        <button
            onClick={handleAnswer}
            style={{
                backgroundColor: "limegreen",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }}
            disabled={disabled}
        >
            Submit Answer
        </button>
    );
};

export default AnswerButton;
