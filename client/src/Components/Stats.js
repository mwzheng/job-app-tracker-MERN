import React, { useEffect, useState } from 'react';
import StatsModal from './StatsModal'

// Component displays job stats: 
// - # days since you've started job searching
// - # jobs you've applied to
// - # job apps you're waiting on a reply from
// - # job rejections
// - Avg Days per applications
// - % of jobs you've been rejected from
const Stats = ({ jobs }) => {
    const [jobSearchingDays, setJobSearchingDays] = useState(0);
    const [jobsApplied, setJobsApplied] = useState(0);
    const [jobsWaiting, setJobsWaiting] = useState(0);
    const [jobRejections, setJobRejections] = useState(0);
    const [avgDaysPerApp, setAvgDaysPerApp] = useState(0);
    const [jobRejectionPercentage, setJobRejectionPercentage] = useState(0);
    const [showStatsModal, setShowStatsModal] = useState(false);
    let allStats = {};
    const jobAppList = JSON.parse(jobs);

    const calcJobStats = () => {
        if (jobAppList.length === 0) {
            setStats(0, 0, 0, 0, 0, 0);
            return;
        }

        let numbOfApplications = jobAppList.length;
        let daysOfJobSearching = calcDaysJobSearching();
        let numbOfRejections = jobAppList.filter(anApp => anApp.status === 'Rejected').length;
        let rejectionPercentage = (((numbOfRejections) / numbOfApplications) * 100).toFixed(2);
        let waitingApps = numbOfApplications - numbOfRejections;
        let daysPerApp = (daysOfJobSearching / numbOfApplications).toFixed(2);
        setStats(daysOfJobSearching, numbOfApplications, waitingApps, numbOfRejections, daysPerApp, rejectionPercentage);
    }

    const populateAllStatsData = () => {
        allStats = {
            jobSearchingDays: jobSearchingDays,
            jobsApplied: jobsApplied,
            jobsWaiting: jobsWaiting,
            jobRejections: jobRejections,
            avgDaysPerApp: avgDaysPerApp,
            jobRejectionPercentage: jobRejectionPercentage,
        }
    }

    const setStats = (daysSearching, totalJobs, jobsWaiting, jobsRejected, avgDaysPerApp, rejectionPercentage) => {
        setJobSearchingDays(daysSearching);
        setJobsApplied(totalJobs);
        setJobsWaiting(jobsWaiting);
        setJobRejections(jobsRejected);
        setAvgDaysPerApp(avgDaysPerApp);
        setJobRejectionPercentage(rejectionPercentage);
    }

    const calcDaysJobSearching = () => {
        let daysOfJobSearching = 0;

        if (jobAppList.length !== 0) {
            let dateToday = new Date();
            let earliestAppDate = new Date(jobAppList[0]["date"]);
            daysOfJobSearching = Math.floor((dateToday - earliestAppDate) / (1000 * 60 * 60 * 24)) + 1;
        }

        return daysOfJobSearching;
    }

    populateAllStatsData();
    useEffect(calcJobStats);

    return <div id='statsContainer'>
        <StatsModal jobs={jobs} allStats={allStats} showStatsModal={showStatsModal} setShowStatsModal={setShowStatsModal} />
        <h3>Job Application Stats</h3>
        <div id='jobStats'>
            <div>
                <div># Days Searching</div>
                <span id='jobSearchingDays'>{jobSearchingDays}</span>
            </div>
            <div>
                <div># Applied:</div>
                <span id='numbApplied'>{jobsApplied}</span>
            </div>
            <div>
                <div># Waiting on:</div>
                <span id='numbWaiting'>{jobsWaiting}</span>
            </div>
            <div>
                <div># Rejections:</div>
                <span id='numbRejections'>{jobRejections}</span>
            </div>
            <div>
                <div>Avg. Days Per App:</div>
                <span id='avgAppsPerDay'>{avgDaysPerApp}</span>
            </div>
            <div>
                <div>Rejection Rate:</div>
                <span id='rejections'>{jobRejectionPercentage}</span>%
            </div>
        </div>
        <button onClick={e => setShowStatsModal(true)}>Visualize</button>
    </div >;
}

export default Stats;