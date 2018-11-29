import React from 'react'


const LoggedInLandingPage = props => {
    return (
        <div>
           <h1>Welcome.</h1>
           <br/>
           <p>Would you like to register a new user for the database? Click here:   </p><button onClick={ev => {ev.preventDefault(); props.history.push('/sign-up')}}>Register</button>
        </div>
    )
}

export default LoggedInLandingPage;