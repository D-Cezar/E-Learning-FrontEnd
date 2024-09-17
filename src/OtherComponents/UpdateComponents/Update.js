import { getCourseId } from './CourseInfo';
import { getCompletedSections } from './SectionCounter';
import { startTimer, stopTimer } from './TimeTrack';
import { UpdateCourseUserInfo } from '../SectionComponents/BackEndComunications';

const updateOnCompletedSection = async () => {
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
    } finally {
        startTimer();
    }
};

export default updateOnCompletedSection;
