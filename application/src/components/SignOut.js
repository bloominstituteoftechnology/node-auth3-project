import React from 'react';

class SignOut extends React.Component {
constructor(props){
    super(props)
    this.state = {}
}

signOut = (e) => {
    localStorage.removeItem('Token')
    this.props.history.push('/login')
}

render(){
    return(
        <div className="sign-out">
            <h2>Are you sure you want to sign out?</h2>
            <button onClick={this.signOut}>Yes</button>
            <button onClick={() => {this.props.history.push('/')}}>No</button>
        </div>
    )
}
}

export default SignOut;