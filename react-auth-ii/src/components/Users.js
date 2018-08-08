import React from 'react';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/users')
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
                        return <li>{user.username}, {user.department}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Users;