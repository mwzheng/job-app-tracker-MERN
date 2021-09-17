import React, { useState } from 'react';

// Component creates an individual row in the table for a single job application
const Tablerow = ({ jobs, appData, setJobs, setShowUpdateModal, setJobAppToUpdate }) => {
    // Default Val for progress = 'Waiting' and for status = 'Applied'
    const [progress, setProgress] = useState(!appData.progress ? 'Waiting' : appData.progress);
    const [status, setStatus] = useState(!appData.status ? 'Applied' : appData.status)
    const [disableProgress, setDisableProgress] = useState(status === 'Rejected');
    let { number, name, date, location, link } = appData;
    let jobAppIndex = number - 1; // Index of job App in jobs array
    let jobList = JSON.parse(jobs);

    // Opens job application link in a new tab
    const openLink = (jobLink) => {
        window.open(jobLink, '_blank');
    }

    const changeProgress = () => {
        let newProgress = (progress === 'In Progress') ? 'Waiting' : 'In Progress';
        setProgress(newProgress);
        updateJobField('progress', newProgress);
    }

    const changeStatus = () => {
        setDisableProgress(status === 'Unknown');
        let newStatus = getNextStatus();
        setStatus(newStatus);
        updateJobField('status', newStatus);
    }

    const updateJobField = (key, newValue) => {
        let job = jobList[jobAppIndex];
        jobList[jobAppIndex] = job;
        job[key] = newValue;
        updateJobList(jobList);
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

    const deleteJobApp = (number) => {
        if (!deleteConfirmed()) return;
        let updatedJobList = jobList.filter(aJobApp => aJobApp.number !== number);
        updatedJobList = reIndexApps(updatedJobList);
        updateJobList(updatedJobList);
    }

    const reIndexApps = (appList) => {
        let appNumber = 1;

        return appList.map(aJobApp => {
            aJobApp.number = appNumber;
            appNumber++;
            return aJobApp;
        })
    }

    const deleteConfirmed = () => {
        let message = 'Are you sure you want to delete this job app?\n(This CANNOT be undone!)\n' +
            `\nApplication #: ${number}\nCompany Name: ${name}\nLocation: ${location}`;

        return window.confirm(message);
    }

    // Update job list state & localstorage data
    const updateJobList = (updatedList) => {
        let newJobList = JSON.stringify(updatedList);
        setJobs(newJobList);
        localStorage.setItem('jobAppList', newJobList);
    }

    const editJobApp = () => {
        setShowUpdateModal(true);
        setJobAppToUpdate(number - 1)
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
            <button className='deleteButton' onClick={e => deleteJobApp(number)}>
                <i className='fa fa-trash' aria-hidden='true'></i>
            </button>
        </td>
    </tr>;
}

export default Tablerow;