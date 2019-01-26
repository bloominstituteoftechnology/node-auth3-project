import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const LoginContainer = styled.div`
    display: flex;
    position:fixed;
    z-index:0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:102vh;
    width:100%;
    background-color:#2c3442;
    form{
        input{
            height:25px;
            width:160px;
            border: 1.5px solid #4b6082;
        }
        button{
            width:100px;
            height:25px;
            border:1px solid black;
            background-color:#5E8394;
            &:hover{
                background:white;
            }
        }
    }
    p{
        color: white;
        font-size: 18px;
        font-weight:bolder;
    }
    .nav{
        color:#5f91e8;
        text-decoration:none;
        font-size:20px;
    }
   
`
const LoginHeader = styled.div`
@import url('https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe');
    margin:0 auto;
    >h1{
        text-align:center;
        font-size:2.8rem;
        margin-bottom: 80px;
        font-family: 'ZCOOL KuaiLe', cursive;
        background-color:#5E8394;
        border-radius:8px;
        border: 2px solid white;
        color:white
    }
` 
const LoginImg = styled.img`
    position:fixed;    
    width: 80%;
    height: 100%;
    left:20%;
    bottom:0;
    z-index:-1;
    border-radius:8px;
    -webkit-clip-path: polygon(68% 0, 100% 0, 41% 100%, 0 100%);
`

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: ''
        };
    }
    handleInputChange = e =>{
     this.setState({ [e.target.name]: e.target.value })
    }
    handleLoginSubmit = e => {
        e.preventDefault();
        const endPoint = 'http://localhost:5555/api/login';
        axios.post(endPoint, this.state)
        .then(res=>{
            localStorage.setItem('jwtToken', res.data.token);
            console.log(res.data.token, this.state.username);
        }).catch(err=>{
        console.log('ERROR', err);
        })
        
    }
    render(){
    return(
        <LoginContainer>
               <LoginImg src="https://blog.theodo.fr/wp-content/uploads/2017/02/padlock.jpg"  alt="lock and keys" />
            <LoginHeader >
               <h1>Are you Authentic<br /> .......log-in</h1>
            </LoginHeader>
            <form onSubmit={this.handleLoginSubmit}>
           
                <FormGroup>
                  <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
                </FormGroup>
                {' '}
                <FormGroup>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                </FormGroup>
                {' '}
                <button type='submit' >Login</button>
               
            </form>
            <div>
                <p>Don't have an account sign-up <span><NavLink to='/register' className='nav'>HERE</NavLink></span></p>
            </div>
            </LoginContainer>
    )}
}
export default Login;


