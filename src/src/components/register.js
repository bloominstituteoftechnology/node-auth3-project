import React, {Component} from 'react';
import axios from 'axios';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          loggedIn: false,
          username: '',
          regusername: '',
          password: '',
          regpassword: '',
        }
      }

    register = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4400/api/register/', {
        "username": this.state.regusername, 
        "password": this.state.regpassword
    }).then(res => {
        console.log('data sent')
        if (res){
        this.setState({
            loggedIn: true, 
            regusername: '',
            regpassword: '',
        })
        console.log(res)
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem('token'))
        }
    }
    ).catch(err => console.log(err))
    }

    inputHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    })
    }

    render(props){
        return (
            <div>
                <h1>Register Component</h1>
                <div className="register">
                    <h4>Register</h4>
            
                    <form onSubmit={this.register}>
                        <input
                        required
                        autoFocus
                        onChange={this.inputHandler}
                        name="regusername"
                        value={this.state.regusername}
                        // value={this.state.[this.name]}
                        // can I do something like the above?
                        placeholder="Name"
                        type="text"
                        >{this.value}</input>
                        <input
                        required
                        onChange={this.inputHandler}
                        name="regpassword"
                        value={this.state.regpassword}
                        placeholder="Password"
                        type="password"></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;