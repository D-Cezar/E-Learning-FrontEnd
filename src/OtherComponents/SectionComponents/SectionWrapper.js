import React, { useState, useEffect } from 'react';
import SectionDetails from './SectionDetails';
import CompletedSection from './CompltedSection/RenderCompletedSections';
import PreviewSections from './PreviewSections';
import updateOnCompletedSection from '../UpdateComponents/Update';
import { setCourseId } from '../UpdateComponents/CourseInfo';
import { startTimer } from '../UpdateComponents/TimeTrack';
import { addSection } from '../UpdateComponents/SectionCounter';

const Sections = ({ sections = [], sectionTitles = [], enrolled, courseId, completedSectionIds = [], completed }) => {
    const [newlyCompletedSectionIds, setNewlyCompletedSectionIds] = useState([]);  

    useEffect(() => {
        if (enrolled) {
            setCourseId(courseId);
            startTimer();
        }
    }, [courseId, enrolled]);

    const handleSectionComplete = (sectionId) => {
        if (!newlyCompletedSectionIds.includes(sectionId)) {
            addSection(sectionId);
            updateOnCompletedSection();
            setNewlyCompletedSectionIds([...newlyCompletedSectionIds, sectionId]);  
            console.log("Section completed:", sectionId);
        }
    };

    console.log('Enrolled:', enrolled);

    return (
        <div className="sections">
            {enrolled ? (
                sections.map((section) => (
                    newlyCompletedSectionIds.includes(section.id) || completedSectionIds.includes(section.id) ? (
                        <CompletedSection key={section.id} section={section} />
                    ) : (
                        <SectionDetails 
                            key={section.id} 
                            section={section} 
                            onComplete={() => handleSectionComplete(section.id)} 
                        />
                    )
                ))
            ) : (
                <PreviewSections sectionTitles={sectionTitles} />
            )}
        </div>
    );
};

export default Sections;
