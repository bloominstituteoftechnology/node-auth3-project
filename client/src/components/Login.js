import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { login } from '../actions';

class Login extends Component{
  state = {
    username: '',
    password: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(user, () => this.props.history.push('/users'));
  }

  render(){
    return(
      <React.Fragment>
        {this.props.isLoggedIn ? <h1>{this.props.username} is currently logged in. Please logout first</h1> :
                                  <AuthForm
                                    change={this.handleChange}
                                    submit={this.handleSubmit}
                                    username={this.state.username}
                                    password={this.state.password}
                                  />}
        {this.props.isLoggingIn && <h3>Please Wait...</h3>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return{
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    isLoggingIn: state.isLoggingIn
  }
}

export default connect(mapStateToProps, { login })(Login);
