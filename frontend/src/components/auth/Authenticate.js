import React from 'react';
import { Redirect } from 'react-router'

const Authenticate = Component => {
    return class WrappedComponent extends React.Component {

        state = {
            loggedIn: false,
        }

        componentWillMount() {
            console.log('Authenticate: componentWillMount()');
            if (!localStorage.getItem('jwt')) {
                this.setState({ loggedIn: false });
            } else {
                this.setState({ loggedIn: true });
            }
        }

        render() {
            console.log('Authenticate: render()');
            return !this.state.loggedIn ? <Redirect to="/auth/login" /> : <Component />;
        }
    }
};

export default Authenticate;