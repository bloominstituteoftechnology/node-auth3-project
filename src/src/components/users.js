import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
                <UserDiv>
                    <h1>List of Users</h1>
                    <div>{this.state.users ? this.state.users.users.map(user => {
                        return (
                            <div className="user" key={user.id}>
                                <p>id: {user.id} </p>
                                <p>name: {user.username} </p>
                                <p>department: {user.department}</p>
                            </div>
                        )}) : 
                        null}
                    </div>
                </UserDiv>
            </div>
        )
    }
}

export default Users;

const UserDiv = styled.div`
    .user {
        border: 1px solid black;
        padding: 10px;
        margin: 3px;
    }
`;