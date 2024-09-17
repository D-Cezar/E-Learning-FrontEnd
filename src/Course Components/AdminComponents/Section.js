import React, { useState } from 'react';

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="section">
            <div
                className="section-header"
                onClick={toggleSection}
                style={{ backgroundColor: isOpen ? 'green' : 'red', cursor: 'pointer' }}
            >
                <h2>{title}</h2>
            </div>
            {isOpen && (
                <div className="section-content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;
