import axios from 'axios';
import React from 'react';

// Component used to delete all data information
const Reset = ({ jobs, setUpdated }) => {
    const resetJobAppList = () => {
        if (window.confirm("Are you sure you want to reset table?\nThis CANNOT be undone!")) {
            jobs.forEach(jobApp => {
                const config = {
                    'Content=Type': 'application.json'
                }

                axios.delete(`api/v1/jobApps/${jobApp._id}`, config);
            })

            setUpdated(true);
        }
    }

    return <div id='resetContainer'>
        <button id='resetButton' onClick={resetJobAppList}>Reset Table</button>
    </div>;
}

export default Reset;