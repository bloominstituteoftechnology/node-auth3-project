import React from 'react'
import LoggedOutLandingPage from './LoggedOutLandingPage.js'
import LoggedInLandingPage from './LoggedInLandingPage.js'


const LandingPage = props => {
    return (
        <div>
        {props.loggedIn === false ? <LoggedOutLandingPage props={props}/> : <LoggedInLandingPage />}
        </div>
    )
}

export default LandingPage;