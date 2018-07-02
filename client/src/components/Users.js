import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, List, ListItem, ListItemText } from '@material-ui/core'
import axios from 'axios'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
})

class Users extends React.Component {
    state = {
        users: []
    } 

render() {
    return (
    <div className="root">
        <List component="nav"><span />
             {this.state.users.map(user => <ListItemText inset primary={user.username} style={{textAlign: 'center'}} key={user._id} />)}
        </List>
    </div>
    )
}

componentDidMount() {
    // get token from somewhere
    const token = localStorage.getItem('token');
    console.log('token', token)
    // attach token as Authorization header
    const requestOptions = {
        headers: {
            authorization: token,
        }
    };
    axios.get('http://localhost:5500/api/users', requestOptions)
        .then(response => {
            this.setState({ users: response.data });
        })
        .catch(err => {
            this.props.history.push('/signin')
        })
    }
}

export default withStyles(styles)(Users)