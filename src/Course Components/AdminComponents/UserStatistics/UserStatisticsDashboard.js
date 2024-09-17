import React from 'react';
import UserList from './UserList';
import ChartComponent from '../ChartComponent';


const UserStatisticsDashboard = ({ data, courseId }) => {
    if (!data) {
        return <div>Loading...</div>;
    }

    const rightAnswersData = [
        { name: 'Right Answers', value: data.rightAnswersProcentage },
        { name: 'Wrong Answers', value: 100 - data.rightAnswersProcentage }
    ];

    return (
        <div>
            <h2>User Statistics</h2>
            <ChartComponent data={rightAnswersData} title="Right vs. Wrong Answers" />
            <UserList courseId={courseId}/>
        </div>
    );
};

export default UserStatisticsDashboard;