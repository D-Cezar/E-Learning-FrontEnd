import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { getUserInfo } from '../Authentification/HandleUserInfo';
import './CourseList.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const user = getUserInfo();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://localhost:7143/courses', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                setCourses(response.data);
            } catch (err) {
                setError('Could not fetch courses');
            }
        };

        fetchCourses();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="course-list-container">
            <div className="course-card-container">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
