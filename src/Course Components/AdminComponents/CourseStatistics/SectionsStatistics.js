import React from 'react';
import ChartComponent from '../ChartComponent';

const SectionFinishedStatistics = ({ procentages, titles }) => {
    if (!procentages || !titles || procentages.length !== titles.length) {
        return <div>Loading...</div>;
    }

    const chartDataArray = procentages.map((percentage, index) => ({
        title: `Completion Percentage for ${titles[index]}`,
        data: [
            { name: 'Completed', value: percentage },
            { name: 'Not Completed', value: 100 - percentage }
        ]
    }));

    return (
        <div>
            <h2>Section Completion Statistics</h2>
            {chartDataArray.map((chartData, index) => (
                <div key={index} className="chart-container">
                    <ChartComponent data={chartData.data} title={chartData.title} />
                </div>
            ))}
        </div>
    );
};

export default SectionFinishedStatistics;
