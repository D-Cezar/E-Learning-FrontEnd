import React, { useState, useEffect } from 'react';
import Sidebar from './AdminComponents/Sidebar';
import CourseStatisticsDashboard from './AdminComponents/CourseStatistics/CourseStatisticsDashboard';
import UserStatisticsDashboard from './AdminComponents/UserStatistics/UserStatisticsDashboard';
import EditCourse from './AdminComponents/CourseEdit/EditCourse';
import { fetchStatisticsData } from './AdminComponents/BackendCalls';
import './style.css';

const CourseAdminContent = ({ course }) => {
    const [selectedDashboard, setSelectedDashboard] = useState('courseStatistics');
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const courseData = await fetchStatisticsData(course.id);
                setData(courseData);
            } catch (error) {
                console.error('Failed to fetch course data', error);
            }
        };

        getData();
    }, [course.id]);

    const renderDashboard = () => {
        switch (selectedDashboard) {
            case 'courseStatistics':
                return <CourseStatisticsDashboard data={data} titles={course.sections.map(section => section.title)} />;
            case 'userStatistics':
                return <UserStatisticsDashboard data={data} courseId={course.id} />;
            case 'courseEdit':
                return <EditCourse course={course}/>;
            default:
                return <CourseStatisticsDashboard data={data} titles={course.sections.map(section => section.title)} />;
        }
    };

    return (
        <div className="course-admin-content">
            <div className="main-dashboard">
                <Sidebar onSelect={setSelectedDashboard} />
                <div className="dashboard-content">
                    <h1>{course.title}</h1>
                    {renderDashboard()}
                </div>
            </div>
        </div>
    );
};

export default CourseAdminContent;
