
import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    state = {
        username: 'sam',
        race: 'hobbit',
        password: 'mellon'
    };

render() {
    return (
        <form onSubmit={this.submitHandler}>
          <div>
              <label>Username</label>
              <input
              value={this.state.username}
              onChange={this.inputChangeHandler}
              name="username"
              type="text"
            />
          </div>
          <div>
          <label>Password</label>
          <input
               value={this.state.password}
               onChange={this.inputChangeHandler}
               name="password"
               type="password"
                />
              </div>
              <div>
                 <button type="submit">Signin</button>
              </div>
        </form>
    );
}

submitHandler = event => {
    event.preventDefault();
    //console.log(this.state);

    axios
        .post('http://localhost:5500/api/auth/login', this.state)
        .then(response => {
            console.log('response', response.data)
           // localStorage.setItem('jwt', response.data.token);

            //console.log('signing props', this.props);
           // this.props.history.push('/users');
        })
        .catch(err => console.log('bad panda'));
    };

    inputChangeHandler = event => {
        //console.log('changing ', event.target.name);
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
}

export default Signin;




