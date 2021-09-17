import React from 'react'

// Page footer that includes link to src code
const Footer = () => {
    const githubLink = 'https://github.com/mwzheng/job-application-tracker';
    const yearAppCreated = 2021;
    const currentYear = new Date().getFullYear();

    return <div className='footer'>
        <i className="fa fa-copyright" aria-hidden="true">
            <span> {yearAppCreated} - {currentYear}</span>
        </i>
        <i className="fa fa-github" aria-hidden="true">
            <span> <a href={githubLink} rel="noreferrer" target="_blank">GitHub</a></span>
        </i>
    </div>;
}

export default Footer;