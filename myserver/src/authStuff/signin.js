import React, {Component} from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            department: ''
        }
    }

    
    render() {
        
        return (
            <div className="signin">
            <p>hello world</p>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input name="username" type="text" placeholder="Username" onChange={this.inputHandler}/>
                </div>
     
                <div>
                    <label htmlFor="password">Password: </label>
                    <input name="password" type="text" placeholder="Password" onChange={this.inputHandler}/>
                </div>

                <div>
                    <label htmlFor="department">Department: </label>
                    <input name="department" type="text" placeholder="Department" onChange={this.inputHandler}/>
                </div>
               
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>

            <button type="submit" onClick={this.signout}>Sign out</button>
            </div>
        )}
        
        
        signout = (e) => {
            console.log(`hi`);
            localStorage.removeItem('jwt')
         }

        handleSubmit = (e) => {
            
            e.preventDefault();
            const endpoint = 'http://localhost:9876/api/login';

            const login = {
                username: this.state.username,
                password: this.state.password
            }
  
            axios.post(endpoint, login)
            // using local storage -- onSubmit puts token in localStorage
            // the get req for users retrieves the token from localStorage
            .then(res=>{
                console.log(res.data);
                // localStorage.setItem('jwt', res.data.token);
                localStorage.setItem('jwt', res.data.token)
            })
            .catch(err => {
                console.log('ERROR, l52, signin', err)
            })
         }
         
        inputHandler = (e) => {
            this.setState({[e.target.name]: e.target.value})
            console.log(this.state)
         }


         // function protected === middleware that checks auth
         // gets passed in on the axios.post in signin

         // function generateToken
         // gets passed in 
         
}

export default Signin;
