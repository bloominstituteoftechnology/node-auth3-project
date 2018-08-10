import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {
            username: '',
            password: '',
            department: ''
          },
          errors: {}
        }
    }

    handleChange = (user, event) => {
        this.setState({[user]: {...this.state[user], [event.target.name]: event.target.value}})
      }

      addUser = (e) => {
        e.preventDefault();
        const user = this.state.user;
        const errors = this.validate(user);
        this.setState({errors})
        if(Object.keys(errors).length) return;
        axios.post('http://localhost:8000/api/register', user)
        .then(response => {
          console.log(response);
          localStorage.setItem("token", JSON.stringify(response.data));
        })
        .catch(err => {
          console.log(err)
        })
      }

      validate = (user) => {
        const errors = {};
        if(!user.username) errors.username = 'Username Required';
        if(!user.password) errors.password = 'Password Required';
        if(!user.department) errors.department = 'Department Required';
        return errors;
      }

    render() {
    return (
        <div>
            <h3>Register</h3>
        <form>
          <input
            type='text'
            name='username'
            placeholder='Choose a username'
            onChange={this.handleChange.bind(this, 'user')}
            />
            <span style={{color: 'red'}}>{this.state.errors.username}</span>
          <input
            type='password'
            name='password'
            placeholder='Choose a password'
            onChange={this.handleChange.bind(this, 'user')}
            />
            <span style={{color: 'red'}}>{this.state.errors.password}</span>
            <input
            type='text'
            name='department'
            placeholder='Department'
            onChange={this.handleChange.bind(this, 'user')}
            />
            <span style={{color: 'red'}}>{this.state.errors.department}</span>
            <button onClick={this.addUser}>Register</button>
            </form>
        </div>
    )}
}


Register.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired
    })
}
export default Register;