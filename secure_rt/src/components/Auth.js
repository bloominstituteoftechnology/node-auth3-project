import React, {Component} from 'react';

const Authenticate = App => Signin => 
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                signedIn: false
            }
        };

    componentDidMount() {
        if(!localStorage.getItem('token')) {
            console.log('Signup')
            this.setState({ signedIn: false });
        } else {
            console.log('Signin')
            this.setState({ signedIn: true })
        }
    };

    render() {
        if(this.state.signedIn) {
            return <App />
        }
        return <Signin />;
    }
}

export default Authenticate;