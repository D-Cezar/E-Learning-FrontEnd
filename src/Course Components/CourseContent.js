import { useEffect } from 'react';
import './CourseContent.css';
import { FaUser, FaBook } from 'react-icons/fa';
import EnrollButton from '../OtherComponents/SectionComponents/EnrollButton';
import Sections from '../OtherComponents/SectionComponents/SectionWrapper';
import PreviewSections from '../OtherComponents/SectionComponents/PreviewSections';
import { setCompletedSections, resetCompletedSections } from '../OtherComponents/UpdateComponents/SectionCounter';
import useAutoUpdateCourseInfo from '../OtherComponents/UpdateComponents/AutoUpdate';

const CourseContent = ({ course }) => {
    const enrolled = course.enrolled;
    const completedSectionIds = course.completedSectionIds || [];

    console.log(completedSectionIds);

    const reloadPage = () => {
        window.location.reload(); 
    };

    useEffect(() => {
        if (enrolled) {
            resetCompletedSections(); 
            setCompletedSections(completedSectionIds);
        }
    }, [enrolled, completedSectionIds]);

    useAutoUpdateCourseInfo(enrolled && !course.completed); 

    return (
        <div className="course-content">
            <div className="course-header">
                <h1>{course.title}</h1>
                <EnrollButton enrolled={enrolled} courseId={course.id} rerender={reloadPage} />
                <p>{course.description}</p>
                <div className="course-info">
                    <p><FaUser className="icon" /> <span>Author: {course.author}</span></p>
                    <p><FaBook className="icon" /> <span>Type: {course.type}</span></p>
                </div>
            </div>

            {enrolled ? (
                <Sections
                    sections={course.sections || []}
                    enrolled={enrolled}
                    courseId={course.id}
                    completedSectionIds={completedSectionIds}
                    completed={course.completed}
                />
            ) : (
                <PreviewSections sectionTitles={course.sectionTitles || []} />
            )}
        </div>
    );
};

export default CourseContent;
