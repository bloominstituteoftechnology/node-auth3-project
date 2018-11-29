import React from 'react'


const LoggedOutLandingPage = props => {
    return (
        <div>
           <h1>Welcome!</h1>
           <p>Already a user? Click here to sign in:   </p><button onClick={ev => {ev.preventDefault(); props.props.history.push('/sign-in')}}>Sign In</button>
           <br/>
           <br/>
           <p>Not a user? Click here to register:   </p><button onClick={ev => {ev.preventDefault(); props.props.history.push('/sign-up')}}>Register</button>
        </div>
    )
}

export default LoggedOutLandingPage;