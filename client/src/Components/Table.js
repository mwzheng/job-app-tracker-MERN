import React from 'react';
import Tablerow from './Tablerow';

// Component to make and display the entire table
const Table = ({ jobs, setJobs, setJobAppToUpdate, setShowInfoModal, setShowUpdateModal }) => {
    const jobList = JSON.parse(jobs);

    // Populates the table with data on job apps
    const makeTable = () => {
        return jobList.map(appData => {
            return <Tablerow key={Math.random()} jobs={jobs} setJobs={setJobs} appData={appData}
                setShowUpdateModal={setShowUpdateModal} setJobAppToUpdate={setJobAppToUpdate} />;
        });
    }

    return <table>
        <tbody>
            <tr>
                <th className='editTh'>Edit</th>
                <th>#</th>
                <th>Date</th>
                <th>Company Name</th>
                <th>Location</th>
                <th>Link</th>
                <th>Progress</th>
                <th>Status</th>
                <th className='infoTh'>
                    <button id='infoBttn' onClick={e => setShowInfoModal(true)}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </button>
                </th>
            </tr>
            {makeTable()}
        </tbody>
    </table>;
}

export default Table;