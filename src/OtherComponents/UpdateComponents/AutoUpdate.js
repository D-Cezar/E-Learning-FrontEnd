import { useEffect, useRef } from 'react';
import { getCourseId } from './CourseInfo';
import { getCompletedSections } from './SectionCounter';
import { startTimer, stopTimer, pauseTimer, resumeTimer } from './TimeTrack';
import { UpdateCourseUserInfo } from '../SectionComponents/BackEndComunications';

const useAutoUpdateCourseInfo = (shouldUpdate, updateInterval = 300000) => {  
    const intervalId = useRef(null);

    useEffect(() => {
        const updateCourseInfo = async () => {
            if (!shouldUpdate) return;  

            const courseId = getCourseId();
            const completedSections = getCompletedSections();
            const activeTime = stopTimer();  
            
            try {
                const success = await UpdateCourseUserInfo({
                    courseId,
                    sectionsId: completedSections,
                    activeTime,
                });

                if (success) {
                    console.log("Course user info updated successfully");
                } else {
                    console.error("Failed to update course user info");
                }
            } catch (error) {
                console.error("Error updating course user info:", error);
            }
            startTimer();  
        };

        const handlePageHide = () => {
            updateCourseInfo();  
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.log("timer stoped");
                pauseTimer();  
            } else {
                console.log("timer resumed");
                resumeTimer(); 
            }
        };


        if (shouldUpdate) {
            intervalId.current = setInterval(updateCourseInfo, updateInterval);
        }


        window.addEventListener('pagehide', handlePageHide);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId.current);  
            window.removeEventListener('pagehide', handlePageHide);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [shouldUpdate, updateInterval]);  

    return null;  
};

export default useAutoUpdateCourseInfo;
