import React, { useState } from 'react';
import { titleCase, capitalizeState } from '../Utils';

const UpdateModal = ({ setShowUpdateModal, showUpdateModal, jobAppToUpdate, jobs, setJobs }) => {
    const [newJobName, setnewJobName] = useState('');
    const [newJobLocation, setnewJobLocation] = useState('');
    const [newJobLink, setnewJobLink] = useState('');

    if (!showUpdateModal) return null;

    const lst = JSON.parse(jobs);
    const { name, link, location } = lst[jobAppToUpdate];
    const jobAppNumb = jobAppToUpdate + 1;

    const updateJobApp = () => {
        if (newJobName !== '')
            lst[jobAppToUpdate]['name'] = titleCase(newJobName);

        if (newJobLocation !== '')
            lst[jobAppToUpdate]['location'] = capitalizeState(titleCase(newJobLocation));

        if (newJobLink !== '')
            lst[jobAppToUpdate]['link'] = newJobLink.trim();

        updateJobList(lst);
        setShowUpdateModal(false);
        resetInputStates();
    }

    const resetInputStates = () => {
        setnewJobName('');
        setnewJobLocation('');
        setnewJobLink('');
    }

    const updateJobList = (updatedList) => {
        let newJobList = JSON.stringify(updatedList);
        setJobs(newJobList);
        localStorage.setItem('jobAppList', newJobList);
    }

    return <div className='modal'>
        <div className='editModalContent modalContent'>
            <div className='modalHeader'>
                <span className='modalTitle'>Edit Job Application #{jobAppNumb}</span>
                <button className='closeModalBttn' onClick={e => setShowUpdateModal(false)}>X</button>
            </div>
            <div className='modalBody'>
                <div className='appData'>
                    <p><b>Company Name:</b> {name}</p>
                    <p><b>Job Location:</b> {location}</p>
                    <p><b>Application Link:</b> <a href={link} rel="noreferrer" target='_blank'>link</a></p>
                </div>
                <hr />
                <div className='updateAppForm'>
                    <span>
                        Name: <input className='updateAppInputBox' type='text'
                            onChange={e => setnewJobName(e.target.value)}></input>
                    </span>
                    <span>
                        Location: <input className='updateAppInputBox' type='text'
                            onChange={e => setnewJobLocation(e.target.value)}></input>
                    </span>
                    <span>
                        Link: <input className='updateAppInputBox' type='text'
                            onChange={e => setnewJobLink(e.target.value)}></input>
                    </span>
                </div>
                <button onClick={updateJobApp}>Update Job</button>
            </div>
        </div>
    </div>;
}

export default UpdateModal;