import React, { useState, useEffect } from 'react';

const SectionDescriptionEditor = ({ description, onUpdate }) => {
    const [editedDescription, setEditedDescription] = useState(description);
    const [error, setError] = useState(null);

    useEffect(() => {
        setEditedDescription(description);
    }, [description]);

    const handleChange = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleSave = () => {
        if (editedDescription.trim() === '') {
            setError('Description cannot be empty.');
            return;
        }
        setError(null);
        onUpdate(editedDescription);
    };

    return (
        <div className="section-description-editor">
            {error && <div className="error">{error}</div>}
            <textarea
                value={editedDescription}
                onChange={handleChange}
                rows="10"
                cols="50"
            />
            <button onClick={handleSave}>Save Description</button>
        </div>
    );
};


export default SectionDescriptionEditor;
