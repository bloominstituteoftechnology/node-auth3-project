import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions';

class UserList extends Component {
    render() {
        console.log(this.props);
        return(
            <div>
            {this.props.users.map(user => {
                return(
                    <div key={user.id}>
                        <h3>{user.id}</h3>
                        <p>Username: {user.username}</p>
                        <p>Department: {user.department}</p>
                    </div> 
                )
            })}
        </div>
        )
    }

    componentDidMount() {
        this.props.fetchUsers();
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(UserList);