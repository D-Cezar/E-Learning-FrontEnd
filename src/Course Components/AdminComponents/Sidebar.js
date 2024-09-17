import React from 'react';


const Sidebar = ({ onSelect }) => {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => onSelect('courseStatistics')}>Course Statistics</li>
                <li onClick={() => onSelect('userStatistics')}>User Statistics</li>
                <li onClick={() => onSelect('courseEdit')}>Course Edit</li>
            </ul>
        </div>
    );
};

export default Sidebar;
