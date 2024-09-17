import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data, title }) => {
    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartComponent;
