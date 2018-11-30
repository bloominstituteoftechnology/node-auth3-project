import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
const url = 'http://localhost:3334'


const SignUp =()=>{
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [newUserStatus, setNUS] = useState(false)

  const submit = async e =>{
      e.preventDefault();
      try{
        await axios.post(`${url}/api/register`, {username,  password, department})
        setPassword('')
        setUser('')
        setNUS(true)
      }catch(err){
        setPassword('')
        setUser('')
      }  
        
  }
  if (newUserStatus){
      return <Redirect to='/'></Redirect>
  }
    return (
      <div>
          <h2>Sign up</h2>
          <form onSubmit={submit}>
            <input type='text' onChange={e => setUser(e.target.value)} value={username} placeholder='name'></input>
            <input type='text' onChange={e => setDepartment(e.target.value)} value={department} placeholder='department'></input>
            <input type='password' onChange={e => setPassword(e.target.value)} value={password} placeholder='password'></input>
          <button type='submit'>Submit</button>
          </form>
      </div>
    );
  }


export default SignUp;
