import React, {Component} from 'react';
import axios from 'axios'; 

class loginForm extends Component {
    state ={
        name: "admin",
        password: "admin", 
    };

handleInput = (event) => {
this.setState({[event.target.name]: event.target.value })
console.log(event.target.name+ ': ' +event.target.value)
}

 

submitForm = (event) => {
    event.preventDefault();
    const loginInfo = {name: this.state.name, password: this.state.password}
    console.log(loginInfo);

    axios
    .post('http://localhost:4000/api/login', loginInfo)
    .then(res => {
        console.log(res.data)
        
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users')
    })
    .catch(err => {console.log(err)})
}

render(){
return(
    <div>
    <input type="text" placeholder="username" onChange={this.handleInput} name="name"/> 
    <input type="text" placeholder="password" onChange={this.handleInput} name="password"/> 
 
    <button onClick={this.submitForm}>Submit</button> 
    </div>
)}

}

export default loginForm;