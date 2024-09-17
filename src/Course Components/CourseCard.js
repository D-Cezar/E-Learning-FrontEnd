import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../Authentification/HandleToken';
import { getUserInfo } from '../Authentification/HandleUserInfo';
import EnrollButton from '../OtherComponents/SectionComponents/EnrollButton';
import './CourseCard.css';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const token = getToken();
    const user = getUserInfo();
    const isStudent = user?.role === "Student";

    const handleClick = () => {
        if (!token) {
            navigate('/login', { state: { from: `/course/${course.id}` } });
        } else {
            navigate(`/course/${course.id}`);
        }
    };

    return (
        <div className="course-card" onClick={handleClick}>
            {course.Completed && <div className="checkmark">✓</div>}
            <img src={course.imageSourse} alt={course.title} />
            <h2>{course.title}</h2>
            {isStudent && (
                <EnrollButton enrolled={course.enrolled} courseId={course.id} />
            )}
            <div className="course-details">
                <p>{course.description}</p>
                <p>Author: {course.author}</p>
                <p>Type: {course.type}</p>
            </div>
        </div>
    );
};

export default CourseCard;
