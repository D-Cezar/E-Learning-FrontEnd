import React, { useState } from 'react';
import { Enroll } from '../SectionComponents/BackEndComunications';

const EnrollButton = ({ enrolled, courseId, rerender }) => {
    const [isEnrolled, setIsEnrolled] = useState(enrolled);

   
    const handleEnroll = async (event) => {
        event.stopPropagation();
        try {
            await Enroll({ courseId });
            setIsEnrolled(true);
            if (rerender) {
                rerender();  
            }
        } catch (error) {
            console.error('Failed to enroll', error);
        }
    };

    return (
        <button
            className="enroll-button"
            onClick={handleEnroll}
            disabled={isEnrolled}
        >
            {isEnrolled ? 'Enrolled' : 'Enroll'}
        </button>
    );
};

export default EnrollButton;
