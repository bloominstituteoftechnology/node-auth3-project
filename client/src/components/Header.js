import React, { Component } from 'react';
import styled from 'react-emotion';
import { withRouter } from 'react-router-dom'

const Container = styled('div')`
  background-color: black;
  height: 100px;
  display: flex;
  align-items: center;

`
const Button = styled('button')`

border-top: 1px solid #96d1f8;
background: #65a9d7;
background: -o-linear-gradient(top, #3e779d, #65a9d7);
padding: 8.5px 17px;
border-radius: 5px;
box-shadow: rgba(0,0,0,1) 0 1px 0;
text-shadow: rgba(0,0,0,.4) 0 1px 0;
color: white;
font-size: 14px;
font-family: Helvetica
text-decoration: none;
vertical-align: middle;
margin: auto 5px;

  &:hover {
    border-top-color: #28597a;
    background: #28597a;
    color: #ccc;
    text-decoration: none;
  }
  &:focus { outline-style: none; }
`

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     }
  }

 

  login = () => {
    this.props.history.push('/login')
  }
  users = () => {
    this.props.history.push('/loggedin')
  }

  register = () => {
    
    if(this.props.location.pathname === "/loggedin"){
      localStorage.removeItem('token');
      this.props.history.push('/')
      
    }else{
      this.props.history.push('/register')
      
    }
    
  }


  render() { 
    console.log("looking for token",localStorage.getItem('token'))
    return ( 
      <Container >
        {localStorage.getItem('token')
        ? <Button onClick={this.users}>
              Users
          </Button>
        : <Button onClick={this.login}>
              Login
          </Button>
        }
        {/* <Button onClick={this.login}>
             Login
        </Button> */}
        <Button onClick={this.register}>
            {this.props.location.pathname === "/loggedin"
            ? "Logout"
            : "Register"
            }
        </Button>

      </Container>
     )
  }
}
 
export default withRouter(Header);