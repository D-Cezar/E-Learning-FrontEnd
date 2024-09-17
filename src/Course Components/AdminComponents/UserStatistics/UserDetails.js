import React from 'react';

const UserDetails = ({ user, onClose }) => {
    //const completedSection = user.completedSectionTitles; //&& user.completedSectionTitles[0]; 

    return (
        <div className="user-details">
            <h4>{user.firstName} {user.lastName} - Detailed Info</h4>
            <p>Email: {user.email}</p>
            <p>Active Time: {user?.activeTime || 'N/A'}</p>
            <p>Sections Completed: {user.completedSectionTitles.length || 0}</p>
            <button onClick={onClose}>Close</button>
            
            <h5>Completed Sections</h5>
            <ul>
                {user.completedSectionTitles?.map((section, index) => (
                    <li key={index}>{section}</li>
                ))}
            </ul>
            
            <h5>Questions and Answers</h5>
            <ul>
                {user.questionsAndAnswers?.map((qa, index) => (
                    <li key={index}>
                        <p><strong>Question:</strong> {qa.question}</p>
                        <p><strong>Answer:</strong> {qa.givenAnswer}</p>
                        <p><strong>Correct:</strong> {qa.isCorrect ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetails;
