import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import jwtDecode from 'jwt-decode'

const AllUsers = styled.div`
    width: 100vw
    height: 100%
    background: linear-gradient(to right, grey, white)

`

const Li = styled.li`
    list-style-type: none
    margin-top: 5%
`

class Users extends Component {
    state = {
        users: [],
        department: ''
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt')

        const department = jwtDecode(token).department

        const requestOptions = {
            headers: {
                Authorization: token
            }
        }
        axios
            .get('http://localhost:8000/api/users', requestOptions)
            .then(res => {
                let users = res.data.filter(user => user.department === department)
                this.setState({ users: users, department: department })
            })
            .catch(err => {
                console.error("Axios Failed")
            })
    }

    logoutHandler = (e) => {
        localStorage.removeItem('jwt')
    
        this.props.history.push('/signin')
      }

    render() {
    return (
        <AllUsers className="Users">
           <ul>
               {this.state.users.map(user => <Li key={user.id}>Name: {user.userName}<br/>Department: {user.department}</Li>)}
           </ul>
           <div><button onClick={this.logoutHandler}>Logout</button></div>
        </AllUsers>
    );
  }
}

export default Users;
