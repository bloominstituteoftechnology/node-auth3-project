import React from 'react';

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        localStorage.removeItem('jwt');
        this.props.history.push('/login');
    }
    render() {

        return(
            <div>
            <p>You are now logged out.</p>
            </div>
        )
    }
}

export default Logout;