import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            department: '',
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }
    submit = e => {
        e.preventDefault();
        
    }
    render() {
        return (
            <div>
              <input type = 'text'
              name = 'username'
              placeholder = 'username'
              onChange = {this.handleChange}
              /><br />
              <input type = 'text'
              name = 'password'
              placeholder = 'password'
              onChange = {this.handleChange}
              /><br />
              <input type = 'text'
              name = 'department'
              placeholder = 'department'
              onChange = {this.handleChange}
              /><br />
              <button>Submit</button>
            </div>
        );
    }
};

export default Signup;