import React from 'react'; 
import axios from 'axios';

class UsersPage extends React.Component{
    constructor(){
        super(); 
        this.state = {
            users: [],
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('jwt'); 
        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios.get("http://localhost:4400/api/users", requestOptions).then(response => {
            this.setState({
                users: response.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    signOutHandler = () => {
        localStorage.removeItem('jwt'); 
        this.props.history.push('/login'); 
    }

    render(){
        return(
            <div className = "users">
                {this.state.users.map(user => {
                    return <li key = {user.id}>{user.username}</li>
                })}
                <button onClick = {this.signOutHandler}>Sign Out</button>
            </div>
        )
    }
}

export default UsersPage; 