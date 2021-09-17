import axios from 'axios';
import React, { useState } from 'react';

// Component creates an individual row in the table for a single job application
const Tablerow = ({ jobs, appData, setUpdated, number, setJobs, setShowUpdateModal, setJobAppToUpdate }) => {
    const [progress, setProgress] = useState(appData.progress);
    const [status, setStatus] = useState(appData.status)
    const [disableProgress, setDisableProgress] = useState(status === 'Rejected');
    let { _id, name, date, location, link } = appData;

    // Opens job application link in a new tab
    const openLink = (jobLink) => {
        window.open(jobLink, '_blank');
    }

    const changeProgress = async () => {
        let newProgress = (progress === 'In Progress') ? 'Waiting' : 'In Progress';

        const config = {
            'Content=Type': 'application.json'
        }

        await axios.patch(`api/v1/jobApps/${_id}`, { progress: newProgress }, config);
        setProgress(newProgress);
        setUpdated(true);
    }

    const changeStatus = async () => {
        setDisableProgress(status === 'Unknown');
        let newStatus = getNextStatus();
        const config = {
            'Content=Type': 'application.json'
        }
        await axios.patch(`api/v1/jobApps/${_id}`, { status: newStatus }, config);
        setStatus(newStatus);
        setUpdated(true);
    }

    const getNextStatus = () => {
        if (status === 'Applied') {
            return 'Unknown';
        } else if (status === 'Unknown') {
            return 'Rejected';
        } else {
            return 'Applied';
        }
    }

    const deleteJobApp = async () => {
        if (!deleteConfirmed()) return;
        let updatedJobList = jobs.filter(aJobApp => aJobApp._id !== _id);

        const config = {
            'Content=Type': 'application.json'
        }

        await axios.delete(`api/v1/jobApps/${_id}`, config);

        setJobs(updatedJobList);
        setUpdated(true);
    }

    const deleteConfirmed = () => {
        let message = 'Are you sure you want to delete this job app?\n(This CANNOT be undone!)\n' +
            `\nApplication #: ${number}\nCompany Name: ${name}\nLocation: ${location}`;

        return window.confirm(message);
    }

    const editJobApp = () => {
        setShowUpdateModal(true);
        setJobAppToUpdate(number - 1);
    }

    return <tr key={number}>
        <td className='edit'>
            <button className='editBttn' onClick={e => editJobApp()}>
                <i className='fa fa-edit' aria-hidden='true'></i>
            </button>
        </td>
        <td className='number'>
            {number}
        </td>
        <td className='date'>
            {date}
        </td>
        <td className='companyName'>
            {name}
        </td>
        <td className='jobLocation'>
            {location}
        </td>
        <td className='link'>
            <button className='jobLinkButton' onClick={e => openLink(link)}>
                <i className='fa fa-link' aria-hidden='true'></i>
            </button>
        </td>
        <td className='progress'>
            <button className='progressButton' disabled={disableProgress} onClick={e => changeProgress()}>{progress}</button>
        </td>
        <td className='status'>
            <button className={`statusButton ${status.toLowerCase()}`} onClick={e => changeStatus()}>{status}</button>
        </td>
        <td className='delete'>
            <button className='deleteButton' onClick={e => deleteJobApp()}>
                <i className='fa fa-trash' aria-hidden='true'></i>
            </button>
        </td>
    </tr>;
}

export default Tablerow;