import React from 'react';
import Login from './Login';

const Authentication = App =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false
      }
    }

    componentDidMount() {
      if (localStorage.getItem('token')) this.setState({
        loggedIn: true
      });
    }

    render() {
      if (this.state.loggedIn) return <App / > ;
      return <Login / > ;
      //this.state.loggedIn ? return (<App/>:<Login />);
    }
  }


export default Authentication;