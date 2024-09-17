import React from "react";

const ForwardButton = ({ onComplete }) => {
    const handleClick = () => {
        onComplete();  // Mark the section as completed when the button is clicked
    };

    return (
        <button 
            onClick={handleClick} 
            style={{ padding: "10px", backgroundColor: "green", color: "white" }}
        >
            Confirm Section Completed
        </button>
    );
};

export default ForwardButton;
