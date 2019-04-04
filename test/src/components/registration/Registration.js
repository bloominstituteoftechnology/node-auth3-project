import React from 'react';
import styled from 'styled-components';
import { Button, Form } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const initialUser ={
    username: '',
    password: '',
    department: '',
}
class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          user: {...initialUser},
          message: '', 
      };
  }
  
  handleInput = event => {
      const {name, value} =event.target;
    this.setState({ user: {...this.state.user, [name]: value} })
  };
  handleSubmit = e => { 
     e.preventDefault();
     const url = 'http://localhost:5000/api/registration';
      axios
          .post(url, this.state.user)
          .then(res => { 
            if(res.status === 201){
                this.setState({ message : 'Registration Successfull', user: {...initialUser}, })
                this.props.history.push(`/login`);
                console.log(this.state.message);
            }
         })
         .catch(err => {
            this.setState({ message : 'Registration failed', user : {...initialUser}, });
            console.log('Registration Failed', err)
         });
    }
    refLogin = e =>{
      this.props.history.push('/login')
  }

  render(){
    return(
      <LoginBar className ='login-box'>
          <Form  onSubmit={this.handleSubmit} className ='login-form'>
              
              <input 
                  className ='input-form'
                  type="text"
                  placeholder="username or email"
                  name="username"
                  value={this.state.user.username}
                  onChange={this.handleInput}
              />
              <input
                  className ='input-form'
                  type= 'password'
                  placeholder= 'Password'
                  name='password'
                  value={this.state.user.password}
                  onChange={this.handleInput} 
              />
              <input
                  className ='input-form'
                  type= 'text'
                  id='department'
                  placeholder= 'Department'
                  name='department'
                  value={this.state.user.department}
                  onChange={this.handleInput} 
              />
              
              <Button color = 'success' type ='submit'>Sign up</Button>
              
              <span className= 'textp'> <p> Already have an account ? <button onClick= {this.refLogin} >Log in</button></p></span> 

          </Form>
      </LoginBar>
    );
  }
}
export default withRouter(Login);

const LoginBar = styled.div`
      display : flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      width : 100%;
      .login-form{
          display: flex;
          flex-wrap: wrap;
          width: 70%;
          margin: 5% 20% 0 0;
          justify-content: center;
          border: 1px solid rgb(240, 229, 229);
          padding: 5% 0 5% 0;
          @media (min-width: 800px) {
              width: 30%;
          }
          h1{
              font-size: 35px;
              
          }
          .input-form{
              width : 70%;
              margin: 1%;
              padding: 3%;
              border-radius: 6px;
              background: rgb(243, 239, 239);
          }
          button{
              width: 70%;
              margin: 2%;
              padding: 2%;
              border-radius: 6px;
              font-weight: bold;
              font-size: 14px;
          }
          button:hover{
              background: grey;
              color: white;
          }
          .textp{
              width: 70%;
              text-align: center;
              margin: 2%;
          }
      }
`