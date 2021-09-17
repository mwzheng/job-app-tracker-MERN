import React from 'react';

// Component used to delete all data information
const Reset = ({ setJobs }) => {
    const resetJobAppList = () => {
        if (window.confirm("Are you sure you want to reset table?\nThis CANNOT be undone!")) {
            localStorage.removeItem('jobAppList');
            setJobs('[]');
        }
    }

    return <div id='resetContainer'>
        <button id='resetButton' onClick={resetJobAppList}>Reset Table</button>
    </div>;
}

export default Reset;