import React, {Component} from 'react';

class Users extends Component {
    constructor(props) {
        super(props);
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
                <h2>Access denied.</h2>
            )
        }
    }
}
 
export default Users;