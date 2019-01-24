import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { register } from '../store/actions/authActions';

class SignUp extends Component {
   state = {
      username: '',
      name: '',
      password: '',
      department: '',
   };

   changeHandler = e => {
      e.preventDefault();
      this.setState({
         [e.target.id]: e.target.value,
      });
   };

   submitHandler = e => {
      e.preventDefault();
      this.props.login(this.state);
      this.props.history.push('/');
   };

   render() {
      if (this.props.loading) {
         return (
            <div>
               <h1> {this.props.message} </h1>
            </div>
         );
      } else {
         return (
            <div>
               <form onSubmit={this.submitHandler}>
                  <label for="username">Username</label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     onChange={this.changeHandler}
                  />

                  <label for="name">Name</label>
                  <input
                     type="text"
                     name="name"
                     id="name"
                     onChange={this.changeHandler}
                  />

                  <label for="password">Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     onChange={this.changeHandler}
                  />

                  <label for="department">Department</label>
                  <input
                     type="text"
                     name="department"
                     id="department"
                     onChange={this.changeHandler}
                  />

                  <button>Sign Up</button>
               </form>
            </div>
         );
      }
   }
}

const mapStateToProps = state => {
   return {
      loading: state.loading,
      isLoggedIn: state.isLoggedIn,
      message: state.message,
   };
};

export default connect(
   mapStateToProps,
   { register }
)(SignUp);
