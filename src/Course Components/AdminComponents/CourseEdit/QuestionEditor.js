import React, { useState } from 'react';

const QuestionEditor = ({ question, onUpdate, onDelete }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedQuestion({ ...editedQuestion, [name]: value });
    };

    const handleSave = () => {
        if (editedQuestion.text.trim() === '' || editedQuestion.answer.trim() === '') {
            setError('Question and Answer cannot be empty.');
            return;
        }
        setError(null);
        onUpdate(editedQuestion);
    };

    return (
        <div className="question-editor">
            {error && <div className="error">{error}</div>}
            <label>Question:</label>
            <textarea
                name="text"
                value={editedQuestion.text}
                onChange={handleChange}
                rows="2" // Adjust this to make sure the text area fits the design
            />
            <label>Hint:</label>
            <textarea
                name="hint"
                value={editedQuestion.hint}
                onChange={handleChange}
                rows="2" // Adjust this to make sure the text area fits the design
            />
            <label>Answer:</label>
            <textarea
                name="answer"
                value={editedQuestion.answer}
                onChange={handleChange}
                rows="2" // Adjust this to make sure the text area fits the design
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => onDelete(editedQuestion.id)}>Delete</button>
        </div>
    );
};

export default QuestionEditor;
