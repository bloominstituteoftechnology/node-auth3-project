import React from 'react';
const jwtDecode = require('jwt-decode');

export default function AuthCheck(AuthComponent) {
    return class AuthWrapped extends React.Component {
        constructor() {
            super();
            this.state = {
                username: null
            }
        }

        componentDidMount () {
            const token = localStorage.getItem('token');
            if (!token) {
                this.props.history.replace('/signin');
            } else {
                const decoded = jwtDecode(token);
                this.setState({ username: decoded.username });
            }
        }


        render() { 
            if (this.state.user) {
                return ( 
                    <AuthComponent history={this.props.history} username={this.state.username} />
                )
            } else {
                return null
            }
            
        }
    }
     
}