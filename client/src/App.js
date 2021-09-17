import React, { useState } from 'react';
import './App.css';
import Table from './Components/Table';
import Form from './Components/Form';
import Stats from './Components/Stats';
import Reset from './Components/Reset';
import Footer from './Components/Footer';
import InfoModal from './Components/InfoModal';
import UpdateModal from './Components/UpdateModal';

function App() {
  // const sampleData = [
  //   {
  //     "number": 1,
  //     "date": "03/13/21",
  //     "name": "Ascending LLC",
  //     "location": "Rockville, Md",
  //     "link": "https://www.linkedin.com/jobs/view/java-software-developer-in-test-jr-to-senior-at-ascending-llc-2438936060/",
  //     "progress": "In Progress",
  //     "status": "Rejected"
  //   }
  // ]

  const jobList = (localStorage.getItem('jobAppList')) ? localStorage.getItem('jobAppList') : '[]';
  const [jobs, setJobs] = useState(jobList);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [jobAppToUpdate, setJobAppToUpdate] = useState(0);

  return (
    <div className="App">
      <Stats jobs={jobs} />
      <Form jobs={jobs} setJobs={setJobs} />
      <Table jobs={jobs} setJobs={setJobs} setJobAppToUpdate={setJobAppToUpdate}
        setShowInfoModal={setShowInfoModal} setShowUpdateModal={setShowUpdateModal} />
      <Reset setJobs={setJobs} />
      <Footer />
      <InfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />
      <UpdateModal setShowUpdateModal={setShowUpdateModal} showUpdateModal={showUpdateModal}
        jobAppToUpdate={jobAppToUpdate} jobs={jobs} setJobs={setJobs} />
    </div>
  );
}

export default App;