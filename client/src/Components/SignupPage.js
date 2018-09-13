import React from 'react'; 
import axios from 'axios'; 

class SignupPage extends React.Component{
    constructor(){
        super(); 
        this.state = {
            username: '', 
            password: '', 
            department: ''
        }
    }

    onInputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = event => {
        event.preventDefault(); 
        const userProfile = {
            username: this.state.username, 
            password: this.state.password, 
            department: this.state.department
        }
        axios.post("http://localhost:4400/api/register", userProfile ).then(response => {
            this.setState({
                username: "", 
                password: "", 
                department: ""
            })
            const token = response.data.token; 
            localStorage.setItem('jwt', token); 
            this.props.history.push('/users'); 
        }).catch(err => {
            console.log(err); 
        })
    }

    render(){
        return(
            <div onSubmit = {this.onSubmitHandler} className = 'signup'>
                <form>
                    <input type = "text" placeholder = "Username" onChange = {this.onInputChangeHandler} value = {this.state.username} name = "username" />
                    <input type = "password" placeholder = "Password" onChange = {this.onInputChangeHandler} value = {this.state.password} name = "password" />
                    <input type = "text" placeholder = "Department" onChange = {this.onInputChangeHandler} value = {this.state.department} name = "department" />
                    <button type = "submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignupPage; 
