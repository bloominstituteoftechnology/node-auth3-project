import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component {
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

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    componentDidMount(){
       if(localStorage.getItem('token')){
            const token = localStorage.getItem('token')
            const authHeader = {
                header: {
                    token: {token}
                }
            }
            console.log(authHeader)
            axios.get('http://localhost:4400/api/users', authHeader)
                .then(res => {
                    console.log("got users", res.data)
                    this.setState({users: res.data})
                })
                .catch(err => {
                    console.log(err)
                })
       } else {
           this.props.history.push('/start')
       }
        
    }
    //check for token 
    //component did mount 

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.setState({loggedIn: false,})
        this.props.history.push('/start')
      }

    render(props){
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
                <h1>Users Page</h1>
                <p>will return list of users</p>
            </div>
        )
    }
}

export default Users;