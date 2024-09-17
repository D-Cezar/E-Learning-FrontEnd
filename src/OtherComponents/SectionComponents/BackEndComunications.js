import axios from 'axios';
import { getUserInfo } from '../../Authentification/HandleUserInfo';
import { getToken } from '../../Authentification/HandleToken';

export const UpdateCourseUserInfo = async ({ courseId, sectionsId, activeTime }) => {
    const token = getToken();
    const userId = getUserInfo().id;

    const data = {
        CourseId: courseId,
        UserId: userId,
        SectionsId: sectionsId,
        ActiveTime: activeTime
    };

    try {
        const response = await axios.put('https://localhost:7143/CoursesUsers/UpdateCourseUserInfo', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log('Update successful:', response.data);
            return response.data;
        } else {
            console.error('Failed to update course user info:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error updating course user info:', error);
        return false;
    }
};

export const Enroll = async ({ courseId }) => {
    const token = getToken();
    const userId = getUserInfo().id;

    try {
        await axios.post('https://localhost:7143/CoursesUsers/Enroll', {
            userId: userId,
            courseId: courseId
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Failed to enroll', error);
    }
};

export const fetchLastAnswers = async ({ courseId }) => {
    const token = getToken();

    try {
        const response = await axios.get(
            `https://localhost:7143/Answers/${courseId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching last answers:', error);
        throw error;
    }
};
