import React, { useState } from 'react';


const [completedSection, setCompletedSection] = useState(null);



export const setComplete = (section) => {
    setCompletedSection(section);
}

