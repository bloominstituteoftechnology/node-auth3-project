import React, {Component} from 'react';
import Redirect from 'react';
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
                <h1>hello usernmae</h1>
                
            </div>
        )
    }
}

export default Register;