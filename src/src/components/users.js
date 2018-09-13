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
                headers: {
                    Authorization: token
                }
            }
            axios.get('http://localhost:4400/api/users', authHeader)
                .then(res => {
                    this.setState({users: res.data})
                })
                .catch(err => {
                    console.log(err)
                })
       } else {
           this.props.history.push('/start')
       }        
    }

   

    render(props){
        console.log(this.state)
        return (
            <div>
                
                <h1>Users Page</h1>
                <p>will return list of users</p>
                <li>{this.state.users ? this.state.users.users.map(user => {
                    return (
                        <ul>{user.username}</ul>
                    )}) : 
                    null}
                </li>
            </div>
        )
    }
}

export default Users;