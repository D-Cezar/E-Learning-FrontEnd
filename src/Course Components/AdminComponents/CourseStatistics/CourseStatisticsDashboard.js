import React from 'react';
import ChartComponent from '../ChartComponent';
import SectionFinishedStatistics from './SectionsStatistics';

const CourseStatisticsDashboard = ({ data, titles }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeString) => {
    const [timeWithoutFraction] = timeString.split('.');
    return timeWithoutFraction;
};

  const finishedCourseData = [
    { name: 'Finished', value: data.fisnishedCourseProcentage },
    { name: 'Unfinished', value: 100 - data.fisnishedCourseProcentage }
  ];


  return (
    <div>
      <h2>Course Statistics</h2>
      <div className="average-time-box">
        <h3>Average Time</h3>
        <p>{formatTime(data.averageTime)}</p>
      </div>
      <div className="chart-container">
        <ChartComponent data={finishedCourseData} title="Course Completion" />
      </div>
      <SectionFinishedStatistics procentages={data.sectionFinishedProcentage} titles={titles} />
    </div>
  );
};

export default CourseStatisticsDashboard;
