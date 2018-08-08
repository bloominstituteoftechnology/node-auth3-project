import React from 'react';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (user, event) => {
        this.setState({[user]: {...this.state[user], [event.target.name]: event.target.value}})
      }

      logIn = () => {
        const user = this.state.user;
        axios.post('http://localhost:8000/api/login', user)
        .then(response => {
          console.log(response);
          <Redirect to='/users' />
          this.setState({username: '', password: ''})
        })
        .catch(err => {
          console.log(err)
        })
      }

    render (){
    return (
        <div>
            <h3>Log In</h3>
        <input 
            type='text'
            name='username'
            placeholder='Username'
            onChange={props.handleChange.bind(this, 'user')}
            />
            <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={props.handleChange.bind(this, 'user')}
            />
            <button onClick={() => props.logIn()}>Log in</button>
            <button onClick={() => props.logOut()}>Log out</button>
        </div>
    )}
}

export default Login;