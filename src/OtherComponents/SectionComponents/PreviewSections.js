import React from 'react';

const PreviewSection = ({ sectionTitle }) => {
    return (
        <div className="section-preview">
            <h2>{sectionTitle}</h2>
        </div>
    );
};

const PreviewSections = ({ sectionTitles }) => {
    return (
        <div className="sections">
            {sectionTitles.map((title, index) => (
                <PreviewSection key={index} sectionTitle={title} />
            ))}
        </div>
    );
};

export default PreviewSections;
