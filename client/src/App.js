import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import Form from './Components/Form';
import Stats from './Components/Stats';
import Reset from './Components/Reset';
import Footer from './Components/Footer';
import InfoModal from './Components/InfoModal';
import UpdateModal from './Components/UpdateModal';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [jobAppToUpdate, setJobAppToUpdate] = useState(0);
  const [updated, setUpdated] = useState(false);

  const fetchJobApps = () => {
    axios.get('/api/v1/jobApps')
      .then(res => {
        const allApps = res.data.jobApps;
        setJobs(allApps);
      })

    setUpdated(false);
  }

  useEffect(fetchJobApps, [updated])

  return (
    <div className="App">
      <Stats jobs={jobs} setShowUpdateModal={setShowUpdateModal} />
      <Form jobs={jobs} setJobs={setJobs} setUpdated={setUpdated} />
      <Table jobs={jobs} setJobs={setJobs} setUpdated={setUpdated} setJobAppToUpdate={setJobAppToUpdate}
        setShowInfoModal={setShowInfoModal} setShowUpdateModal={setShowUpdateModal} />
      <Reset jobs={jobs} setUpdated={setUpdated} />
      <Footer />
      <InfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />
      <UpdateModal setShowUpdateModal={setShowUpdateModal} showUpdateModal={showUpdateModal}
        jobAppToUpdate={jobAppToUpdate} jobs={jobs} setJobs={setJobs} setUpdated={setUpdated} />
    </div>
  );
}

export default App;