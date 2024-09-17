import axios from 'axios';
import { getToken } from '../../Authentification/HandleToken';

// Base URL for API
const BASE_URL = 'https://localhost:7143';

// Fetch statistics data
export const fetchStatisticsData = async (courseId) => {
    const token = getToken();

    try {
        const response = await axios.get(`${BASE_URL}/Dashboard/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the data!', error);
        throw error; 
    }
};

// Fetch user data
export const fetchUserData = async (courseId) => {
    const token = getToken();

    try {
        const response = await axios.get(`${BASE_URL}/UsersInfo/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the data!', error);
        throw error; 
    }
};


// Add a new question
export const addQuestion = async (sectionId, question, answer, hint = '') => {
    const token = getToken();
    const data = {
        SectionId: sectionId,   
        Question: question,     
        Answer: answer,         
        Hint: hint              
    };

    try {
        const response = await axios.post(`${BASE_URL}/Questions`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error adding the question!', error);
        throw error;
    }
};

// Update a question
export const updateQuestion = async (questionId, questionText, answer, hint = null) => {
    const token = getToken();

    // Form the data object
    const data = {
        Id: questionId,        
        Question: questionText, 
        Answer: answer,         
        Hint: hint              
    };

    try {
        const response = await axios.put(`${BASE_URL}/Questions`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error updating the question!', error);
        throw error;
    }
};

// Edit course section description
export const editCourseSectionDescriptionAndTitle = async (courseSectionId, text, title) => {
    const token = getToken();

    // Form the data object
    const data = {
        courseSectionId: courseSectionId, // ID of the course section to update
        text: text,                        // Updated description text
        title: title
    };

    try {
        const response = await axios.patch(`${BASE_URL}/CourseSection/${courseSectionId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error updating the course section description!', error);
        throw error;
    }
};

// Delete a question
export const deleteQuestion = async (questionId) => {
    const token = getToken();

    try {
        const response = await axios.delete(`${BASE_URL}/Questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('There was an error deleting the question!', error);
        throw error;
    }
};
