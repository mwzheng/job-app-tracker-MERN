import React from 'react';
import { Pie, Line } from 'react-chartjs-2';

const StatsModal = ({ allStats, jobs, showStatsModal, setShowStatsModal }) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const jobList = JSON.parse(jobs);
    const lineInfo = {};

    const countStatuses = () => {
        let waiting = 0;
        let unknown = 0;
        let rejected = 0;

        for (let i = 0; i < jobList.length; i++) {
            let { status } = jobList[i];

            if (status === 'Rejected') {
                rejected++;
            } else if (status === 'Applied') {
                waiting++;
            } else {
                unknown++;
            }
        }

        return [rejected, waiting, unknown];
    }

    // Returns array with job app month & year (Ex: ['Jan 21', 'Feb 21'])
    const getAppDates = () => {
        return jobList.map(aJob => {
            let { date } = aJob; // Date: MM/DD/YY
            let appYr = date.substr(-2);
            date = new Date(date);
            let appMonth = month[date.getMonth()];
            return `${appMonth} ${appYr}`;
        })
    }

    const calclineInfo = () => {
        let data = getAppDates();
        let label = [];
        let count = [];

        for (let i = 0; i < data.length; i++) {
            let time = data[i];

            if (label.includes(time)) {
                count[label.length - 1]++
            } else {
                label.push(time);
                count.push(1);
            }
        }

        lineInfo['label'] = label;
        lineInfo['data'] = count;
    }

    calclineInfo();

    const pieData = {
        labels: ['Rejected', 'Waiting', 'Unknown'],
        datasets: [
            {
                label: '# of Votes',
                data: countStatuses(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 2,
            },
        ],
        yAxesID: 'Count'
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'probability'
                }
            },],
        },
        maintainAspectRatio: false,
    };

    const lineData = {
        labels: lineInfo['label'],
        datasets: [
            {
                label: '# of Jobs Applied',
                data: lineInfo['data'],
                fill: false,
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 7,
            },
        ],
    };

    return showStatsModal ? <div className='modal'>
        <div className='modalContent' style={{ width: '65vw' }}>
            <div className='modalHeader'>
                <span className='modalTitle'>Stats</span>
                <button className='closeModalBttn' onClick={e => setShowStatsModal(false)}>X</button>
            </div>
            <div>
                <div id='jobStats'>
                    <div>
                        <div># Days Searching</div>
                        <span id='jobSearchingDays'>{allStats.jobSearchingDays}</span>
                    </div>
                    <div>
                        <div># Applied:</div>
                        <span id='numbApplied'>{allStats.jobsApplied}</span>
                    </div>
                    <div>
                        <div># Waiting on:</div>
                        <span id='numbWaiting'>{allStats.jobsWaiting}</span>
                    </div>
                    <div>
                        <div># Rejections:</div>
                        <span id='numbRejections'>{allStats.jobRejections}</span>
                    </div>
                    <div>
                        <div>Avg. Days Per App:</div>
                        <span id='avgAppsPerDay'>{allStats.avgDaysPerApp}</span>
                    </div>
                    <div>
                        <div>Rejection Rate:</div>
                        <span id='rejections'>{allStats.jobRejectionPercentage}</span>%
                    </div>
                </div>
            </div>
            <hr />
            <div className='graphContainer'>
                <div>Apps Over Time</div>
                <div>
                    <Line data={lineData} options={options} height={350} width={350} />
                </div>
                <hr />
                <div>App Status Distribution</div>
                <div>
                    <Pie data={pieData} width={275} height={275} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    </div > : null;
}

export default StatsModal;