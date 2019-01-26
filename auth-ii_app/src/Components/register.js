import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {FormGroup} from 'reactstrap'

const RegiContainer = styled.div `
    background-image:url('https://d1sr9z1pdl3mb7.cloudfront.net/wp-content/uploads/2018/04/09174804/online-authentication-large.jpg');
    background-size:cover;
    height: 86.2vh;
    display:flex;
    justify-content:center;
    align-items:center;
   
`
const FormContainer = styled.form `
    display:flex;
    width:100%;
    padding-top:20%;
`


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            username:'',
            password: '',
            department:''
        })
    }
handleRegisterSubmit = e =>{
    e.preventDefault();
    const endPoint = 'http://localhost:5555/api/register';
    axios.post(endPoint, this.state)
    .then(res=>{
        this.setState({username:'',password:'', department:''})
        this.props.history.push('/login');
        alert('user created');

    }).catch(err=>{
        console.log('The Error', err);
    })
}
handleInputChange = e =>{
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state)
}
        render(){
            return(
                <RegiContainer>
                  <form onSubmit={this.handleRegisterSubmit}>
           
           <FormGroup>
             <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
           </FormGroup>
           {' '}
           <FormGroup>
               <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
           </FormGroup>
            {' '}
           <FormGroup>
               <input type="text" name="Department" placeholder="department" value={this.state.department} onChange={this.handleInputChange}/>
           </FormGroup>
           <button type='submit' >Add User</button>
          
       </form>
                </RegiContainer>
            )
        }
    }
export default Register;