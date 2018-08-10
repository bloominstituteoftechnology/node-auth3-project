import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    state = {
            name: '',
            password: '',
            department: ''
        }


    inputChangeHandler = (user, event) => {
        this.setState({[user]: {...this.state[user], [event.target.name]: event.target.value}})
      }

      newUser = () => {
        const user = this.state.user;
        axios.post('http://localhost:3300/register', user)
        .then(response => {
          // console.log(response);
          const token = response.data;
          localStorage.setItem('jwt', token);
        })
        .catch(err => {
          console.log(err)
        })
      }

    render() {
    return (
        <div>
            <h3>Register A New User</h3>
            <form>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder='Enter a new name'
                    onChange={this.inputChangeHandler.bind(this, 'user')}
                    />
                </div>
                <div>
                  <input
                    type='password'
                    name='password'
                    placeholder='Create a password'
                    onChange={this.inputChangeHandler.bind(this, 'user')}
                    />
                </div>
                <div>
                    <input
                    type='text'
                    name='department'
                    placeholder='Add your Department'
                    onChange={this.inputChangeHandler.bind(this, 'user')}
                    />
                </div>
                <div>
                    <button onClick={this.newUser}>Register</button>
                </div>
            </form>
        </div>
    )}
}

export default Register;
