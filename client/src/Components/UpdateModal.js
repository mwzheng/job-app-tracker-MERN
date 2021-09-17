import axios from 'axios';
import React, { useState } from 'react';
import { titleCase, capitalizeState } from '../Utils';

const UpdateModal = ({ setShowUpdateModal, showUpdateModal, jobAppToUpdate, jobs, setUpdated }) => {
    const [newJobName, setnewJobName] = useState('');
    const [newJobLocation, setnewJobLocation] = useState('');
    const [newJobLink, setnewJobLink] = useState('');

    if (!showUpdateModal) return null;

    const { _id, name, link, location } = jobs[jobAppToUpdate];

    const updateApp = async () => {
        const config = {
            'Content=Type': 'application.json'
        }

        let newData = updateData();
        await axios.patch(`api/v1/jobApps/${_id}`, newData, config);
        setUpdated(true);
        setShowUpdateModal(false);
        resetInputStates();
    }

    const updateData = () => {
        let updated = {};

        if (newJobName !== '') {
            updated = { ...updated, "name": titleCase(newJobName) };
        }

        if (newJobLocation !== '') {
            updated = { ...updated, location: capitalizeState(titleCase(newJobLocation)) };
        }

        if (newJobLink !== '') {
            updated = { ...updated, link: newJobLink.trim() }
        }

        return updated;
    }

    const resetInputStates = () => {
        setnewJobName('');
        setnewJobLocation('');
        setnewJobLink('');
    }

    return <div className='modal'>
        <div className='editModalContent modalContent'>
            <div className='modalHeader'>
                <span className='modalTitle'>Edit Job Application #{jobAppToUpdate}</span>
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
                <button onClick={updateApp}>Update Job</button>
            </div>
        </div>
    </div>;
}

export default UpdateModal;