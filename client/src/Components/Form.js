import axios from 'axios';
import React, { useState } from 'react';
import { titleCase, capitalizeState } from '../Utils';

// Component used for form to input new data into the table 
const Form = ({ jobs, setJobs, setUpdated }) => {
    const [jobName, setJobName] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobLink, setJobLink] = useState("");

    const addNewJobApp = async () => {
        if (isBadInput()) return;

        let newJobData = createNewJobApp();

        const config = {
            'Content=Type': 'application.json'
        }

        let res = await axios.post('api/v1/jobApps', newJobData, config);
        updateJobList(res.data.newJobApp);
        setUpdated(true);
        clearInputValues();
    }

    const isBadInput = () => {
        return jobName.trim() === '' || jobLocation.trim() === '' || jobLink.trim() === '';
    }

    const createNewJobApp = () => {
        let name = titleCase(jobName);
        let dateToday = new Date().toLocaleDateString();
        let location = capitalizeState(titleCase(jobLocation));
        let link = jobLink.trim();

        const newJobApp = {
            "name": name,
            "date": dateToday,
            "location": location,
            "link": link,
            "progress": "Waiting",
            "status": "Applied"
        };

        return newJobApp;
    }

    const updateJobList = (newJobData) => {
        const newJobList = jobs;
        newJobList.push(newJobData);
        setJobs(newJobList);
    }

    const clearInputValues = () => {
        setJobName("");
        setJobLocation("");
        setJobLink("");
    }

    return <div className='inputDiv'>
        <label>
            Company Name:
            <input id='companyName' type='text' value={jobName} onChange={e => setJobName(e.target.value)}></input>
        </label>
        <label>
            Job Location:
            <input id='jobLocation' type='text' value={jobLocation} onChange={e => setJobLocation(e.target.value)}></input>
        </label>
        <label>
            App Link:
            <input id='appLink' type='text' value={jobLink} onChange={e => setJobLink(e.target.value)}></input>
        </label>
        <button id='addJobButton' onClick={addNewJobApp}>Add</button>
    </div>;
}

export default Form;