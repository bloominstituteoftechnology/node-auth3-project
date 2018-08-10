import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Authenticate from './Authenticate';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    logOut = event => {
        localStorage.removeItem('token');
        this.props.history.push('/signin')
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const reqOptions = {
            headers: {
                authorization: token
            }
        }
        console.log(token);
        axios
            .get('http://localhost:8000/api/users', reqOptions)
            .then(response => {
                console.log(response);
                this.setState({users: response.data})
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return(
            <div>
                <ul>
                    {this.state.users.map(user => {
                        return <li key={user.id}>{user.username}, {user.department}</li>
                    })}
                    </ul>
                <button onClick={this.logOut}>Log out</button> 
                
            </div>
        )
    }
}



export default withRouter(Users);