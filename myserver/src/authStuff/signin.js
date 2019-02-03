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
            </div>
        )}

        handleSubmit = (e) => {
            e.preventDefault();
            const token = localStorage.getItem('jwt')
            const endpoint = 'http://localhost:9876/api/login';
            const options = {
                headers: {
                    Authorization: token
                }
            }
         
            axios.post(endpoint, options)
            .then(res=>{
                console.log(res.data);
                localStorage.setItem(`${res.data.username}`, res.data.token)
            })
            .catch(err => {
                console.log('ERROR: foo', err)
            })
         }
         
         inputHandler = (e) => {
            console.log(`hello Slack walkthrough folks!`)
            console.log(e.target.usernamename)
            this.setState({
                [e.target.name]: e.target.value})
            console.log(this.state)
         }
         
}

export default Signin;
