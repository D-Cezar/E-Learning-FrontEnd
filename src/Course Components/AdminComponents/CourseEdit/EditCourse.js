import React, { useState } from 'react';
import SectionDescriptionEditor from './SectionDescriptionEditor';
import QuestionsManager from './QuestionsManager';
import './EditCourse.css';
import { addQuestion, updateQuestion, deleteQuestion, editCourseSectionDescriptionAndTitle } from '../BackendCalls';

const EditCourse = ({ course }) => {
    const [selectedSection, setSelectedSection] = useState(course.sections[0]);

    const handleSectionChange = (e) => {
        const newSectionId = parseInt(e.target.value);
        const newSelectedSection = course.sections.find(section => section.id === newSectionId);
        setSelectedSection(newSelectedSection);
    };

    const handleUpdateDescription = async (updatedDescription, updatedTitle) => {
        const updatedSection = { ...selectedSection, textSource: updatedDescription, title: updatedTitle };
        setSelectedSection(updatedSection);
        try {
            await editCourseSectionDescriptionAndTitle(selectedSection.id, updatedDescription, updatedTitle);
            console.log('Section updated successfully');
        } catch (error) {
            console.error('Failed to update section:', error);
        }
    };

    const handleAddQuestion = async (questionData) => {
        // Assuming questionData has { text: ..., hint: ..., answer: ... }
        const newQuestion = {
            id: selectedSection.questions.length + 1,
            text: questionData.text,
            hint: questionData.hint,
            answer: questionData.answer,
        };
        const updatedQuestions = [...selectedSection.questions, newQuestion];
        setSelectedSection({ ...selectedSection, questions: updatedQuestions });
    
        // Call to backend to add the question
        try {
            await addQuestion(selectedSection.id, questionData.text, questionData.answer, questionData.hint);
            console.log('Question added successfully');
        } catch (error) {
            console.error('Failed to add question:', error);
        }
    };
    

    const handleUpdateQuestion = async (updatedQuestion) => {
        try {
            // Correct the property name from `updatedQuestion.question` to `updatedQuestion.text`
            await updateQuestion(updatedQuestion.id, updatedQuestion.text, updatedQuestion.answer, updatedQuestion.hint);
            
            const updatedQuestions = selectedSection.questions.map(q =>
                q.id === updatedQuestion.id ? updatedQuestion : q
            );
            setSelectedSection({ ...selectedSection, questions: updatedQuestions });
            
            console.log('Question updated successfully');
        } catch (error) {
            console.error('Failed to update question:', error);
        }
    };
    

    const handleDeleteQuestion = async (questionId) => {
        try {
            await deleteQuestion(questionId);
            const updatedQuestions = selectedSection.questions.filter(q => q.id !== questionId);
            setSelectedSection({ ...selectedSection, questions: updatedQuestions });
            console.log('Question deleted successfully');
        } catch (error) {
            console.error('Failed to delete question:', error);
        }
    };

    return (
        <div className="edit-course-container">
            <h1>Edit Course: {course.title}</h1>
            <div className="section-selector">
                <label htmlFor="section-select">Select Section: </label>
                <select id="section-select" value={selectedSection.id} onChange={handleSectionChange}>
                    {course.sections.map(section => (
                        <option key={section.id} value={section.id}>{section.title}</option>
                    ))}
                </select>
            </div>
            <SectionDescriptionEditor
                title={selectedSection.title}
                description={selectedSection.textSource}
                onUpdate={handleUpdateDescription}
            />
            <QuestionsManager
                questions={selectedSection.questions}
                onAdd={handleAddQuestion}
                onUpdate={handleUpdateQuestion}
                onDelete={handleDeleteQuestion}
            />
        </div>
    );
};

export default EditCourse;
