import React, { Component } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: "none"
    }
});
class Users extends Component {
    state = {
        users: []
    }

    signout = () => {
        localStorage.removeItem('jwt')
      this.setState({users:[]})
    }
    componentDidMount = () => {
        const token = localStorage.getItem('jwt')
        const endpoint = 'http://localhost:4500/api/users'
        const options = {
            headers: {
                Authorization:token
            }
        }
        this.forceUpdate();
        axios.get(endpoint, options)
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log('error', err)
            })

    }
    render() {
        return (
            <div>
    <h2>Users List </h2>
                {this.state.users.map(user => (
                    <li key={user.id}>{user.username}</li>))}

                <Button
                    onClick={this.signout}
                    variant="contained"
                    color="primary"
                    className={styles.button}
                >
                    Sign Out
          </Button>
            </div>
        )
    }
}



export default Users;