import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    handleChange = (user, event) => {
        this.setState({[user]: {...this.state[user], [event.target.name]: event.target.value}})
      }

      addUser = () => {
        const user = this.state.user;
        axios.post('http://localhost:8000/api/register', user)
        .then(response => {
          console.log(response);
          localStorage.setItem("token", JSON.stringify(response.data));
        })
        .catch(err => {
          console.log(err)
        })
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
          <input
            type='password'
            name='password'
            placeholder='Choose a password'
            onChange={this.handleChange.bind(this, 'user')}
            />
            <input
            type='text'
            name='department'
            placeholder='Department'
            onChange={this.handleChange.bind(this, 'user')}
            />
            <button onClick={this.addUser}>Register</button>
            </form>
        </div>
    )}
}

export default Register;