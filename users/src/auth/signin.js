import React from 'react'
import axios from 'axios'

export default class Signin extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    inputHandler = event => {
        event.preventDefault(); 
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    submitHandler = event => {
        event.preventDefault(); 
        axios.post('', this.state)
          .then(res => {
            localStorage.setItem('jwt', res.data.token)
          })
          .catch(error => {
              console.log("we've encountered an error")
          })
    }

    render(){
        return(
            <div>
                <p>username</p>
                  <input name='username' 
                         value={this.state.username} 
                         onChange={this.inputHandler}/>
                <p>password</p>
                  <input name='password' 
                         value={this.state.password}
                         onChange={this.inputHandler}/> 
                <button onClick={this.submitHandler}>Submit</button>
            </div> 
        )
    }
}