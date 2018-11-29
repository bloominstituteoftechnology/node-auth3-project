import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            loggedIn: false,
        }
    }

    authenticate = () => {
        const token = localStorage.getItem('token');
        const options = {
          headers: {
            authorization: token,
          },
        }
        if (token) {
          axios.get(`http://localhost:9000/api/users`, options)
            .then(res => {
              if (res.status === 200 && res.data) {
                this.setState({loggedIn: true, users: res.data})
              } else {
                throw new Error();
              }
            })
            .catch(err => {
              this.props.history.push('/login')
            })
        } else {
          this.props.history.push('/login')
        }
    }

    componentDidMount = () => {
        this.authenticate();
    }

    componentDidUpdate = (prevProps) => {
        const {pathname} = this.props.history;
        if (pathname === '/' && pathname !== prevProps.history.pathname){
          this.authenticate();
        }
    }


    render() { 
        if (this.state.users) {
            return (
                <div>
                    {this.state.users.map(user => <p key={user.id}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)} works in {user.department.charAt(0).toUpperCase() + user.department.slice(1)}</p>)}
                </div>
            )
        } else {
            return (
                <h1>Access denied. Please log in.</h1>
            )
        }
    }
}
 
export default Users;