import React from 'react';
import Tablerow from './Tablerow';

// Component to make and display the entire table
const Table = ({ jobs, setJobs, setUpdated, setJobAppToUpdate, setShowInfoModal, setShowUpdateModal, setStatsUpdated }) => {
    // Populates the table with data on job apps
    const makeTable = () => {
        let appNumb = 1;

        return jobs.map(appData => {
            return <Tablerow key={appNumb} jobs={jobs} number={appNumb++} setJobs={setJobs} appData={appData}
                setShowUpdateModal={setShowUpdateModal} setJobAppToUpdate={setJobAppToUpdate} setUpdated={setUpdated} />;
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