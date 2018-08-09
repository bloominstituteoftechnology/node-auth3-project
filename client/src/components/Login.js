import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // the login endpoint wants a user object {username, password}
    axios
      .post('http://localhost:3000/api/login', this.state)
      .then(res => {
        // we're sent a JWT token
        const token = res.data;
        // stash it for later use
        localStorage.setItem('jwt', token);
        this.props.history.push('/main');
      })
      .catch(err => {
        console.error('axios err:', err.response.data);
        if (err.response.data.error.includes('Unauthorized')) {
          this.setState({
            error: 'There is an error with your credentials',
            username: '',
            password: '',
          });
        } else {
          this.setState({ error: err.response.data.error });
        }
        this.toggle();
      });
    this.setState({ username: '', password: '' });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Username:
          <input
            type="text"
            name="username"
            onChange={this.handleInput}
            placeholder="username"
            value={this.state.username}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
            onChange={this.handleInput}
            placeholder="password"
            value={this.state.password}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>ERROR</ModalHeader>
            <ModalBody>{this.state.error}</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </form>
    );
  }
}

export default Login;
