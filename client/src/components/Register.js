import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { register } from '../actions';

class Login extends Component{
  state = {
    username: '',
    password: '',
    department: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    }
    this.props.register(user, () => this.props.history.push('/users'));
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
                                    isRegistering
                                    department={this.state.department}
                                  />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return{
    isLoggedIn: state.isLoggedIn,
    username: state.username
  }
}

export default connect(mapStateToProps, { register })(Login);
