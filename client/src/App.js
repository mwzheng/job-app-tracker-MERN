import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import Form from './Components/Form';
import Stats from './Components/Stats';
import Reset from './Components/Reset';
import Footer from './Components/Footer';
import InfoModal from './Components/InfoModal';
import UpdateModal from './Components/UpdateModal';
import { getJobApps } from './request';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [jobAppToUpdate, setJobAppToUpdate] = useState(0);

  const fetchJobApps = () => {
    axios.get('/api/v1/jobApps')
      .then(res => {
        const allApps = res.data.jobApps;
        setJobs(allApps);
      })
  }

  useEffect(fetchJobApps, [])

  return (
    <div className="App">
      {/* <Stats jobs={jobs} /> */}
      <Form jobs={jobs} setJobs={setJobs} />
      <Table jobs={jobs} setJobs={setJobs} setJobAppToUpdate={setJobAppToUpdate}
        setShowInfoModal={setShowInfoModal} setShowUpdateModal={setShowUpdateModal} />
      {/* <Reset setJobs={setJobs} /> */}
      <Footer />
      {/* <InfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />
      <UpdateModal setShowUpdateModal={setShowUpdateModal} showUpdateModal={showUpdateModal}
        jobAppToUpdate={jobAppToUpdate} jobs={jobs} setJobs={setJobs} /> */}
    </div>
  );
}

export default App;