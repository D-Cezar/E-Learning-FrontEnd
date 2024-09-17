import React, { useState } from 'react';
import QuestionEditor from './QuestionEditor';

const QuestionsManager = ({ questions, onAdd, onUpdate, onDelete }) => {
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        hint: '',
        answer: '',
    });

    const handleAdd = () => {
        if (newQuestion.text.trim() === '' || newQuestion.answer.trim() === '') {
            alert('Question and Answer cannot be empty.');
            return;
        }
        onAdd(newQuestion);
        setNewQuestion({
            text: '',
            hint: '',
            answer: '',
        });
    };

    return (
        <div className="questions-manager">
            <h2>Manage Questions</h2>
            <div className="new-question">
                <h3>Add New Question</h3>
                <label>Question:</label>
                <textarea
                    placeholder="Question"
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                    rows="2" // Adjust this to make sure the text area fits the design
                />
                <label>Hint:</label>
                <textarea
                    placeholder="Hint"
                    value={newQuestion.hint}
                    onChange={(e) => setNewQuestion({ ...newQuestion, hint: e.target.value })}
                    rows="2" // Adjust this to make sure the text area fits the design
                />
                <label>Answer:</label>
                <textarea
                    placeholder="Answer"
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    rows="2" // Adjust this to make sure the text area fits the design
                />
                <button onClick={handleAdd}>Add Question</button>
            </div>
            {questions.map((question) => (
                <QuestionEditor
                    key={question.id}
                    question={question}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default QuestionsManager;
