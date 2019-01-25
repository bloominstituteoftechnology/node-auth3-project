import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DisplayPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons{
    display: flex;
  }

  h1{
    font-size: 36px;
  }

  p{
    font-size: 26px;
  }
`;

const NavButton = styled.div`
  font-size: 26px;
  width: 100px
  margin: 20px;
  padding: 8px 12px;
  border: 2px solid black;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  color: black;

  &:hover{
    color: white;
    background-color: black;
    cursor: pointer;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  width: 300px;

  div{
    margin: 10px 10px;
    text-align: left;
  }
`;


class DisplayUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    const options = {
      headers:{
        Authorization: localStorage.getItem('jwt'),
        Xdepartment: localStorage.getItem('department')
      }
    }
    axios.get('http://localhost:3300/api/users', options)
    .then(res=>{
      this.setState({
        users: res.data
      })
    })
    .catch(error=>{
      console.log(error);
    })
  }

  returnHome = (event)=>{
    event.preventDefault();
    this.props.history.push('/');
  }

  logout = (event)=>{
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('department');
    this.props.history.push('/');
  }

  render() {
    if(!this.state.users.length){
      return (
        <DisplayPage>
          <NavButton onClick={this.returnHome}>Home</NavButton>
          <h1>Users</h1>
          <p>You are not authorized to view the users</p>
        </DisplayPage>
      )
    }
    return (
      <DisplayPage>
        <div className="buttons">
          <NavButton onClick={this.returnHome}>Home</NavButton>
          <NavButton onClick={this.logout}>Logout</NavButton>
        </div>
        <h1>Users</h1>
        {this.state.users.map(user=>(
          <User key={user.id}>
            <div className="name">{user.username}</div>
            <div className="department">{user.department}</div>
          </User>
        ))}
      </DisplayPage>
    );
  }
}

export default DisplayUsers;