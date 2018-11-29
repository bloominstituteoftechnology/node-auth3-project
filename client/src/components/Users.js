import React, {Component} from 'react';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
        }
    }

    componentWillMount() {
        this.setState({
            users: this.props.users
        })
    }


    render() { 
        if (this.props.users) {
            return (
                <div>
                    {this.props.users.map(user => <p key={user.id}>{user.username} works in {user.department}</p>)}
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