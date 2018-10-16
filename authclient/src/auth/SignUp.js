import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			department: 'IT',
			error: ''
		};
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	register = event => {

 		const newUser = {
 			username: this.state.username,
 			password: this.state.password,
 			department: this.state.department,
 		}

	 	axios.post('http://localhost:5555/api/register', newUser)
	 		.then(response => {
	 			console.log(response)
	 			localStorage.setItem('jwt', response.data.token);
	 			this.setState({
	 				error: ''
	 			})
	 			this.props.history.push('/users')
	 		})
	 		.catch(error => {
	 			console.log(error)
	 			this.setState({
	 				error: error.response.data,
	 			})
	 		})

 	}


	render() {
		return (
			<div>
				<h1>SignUp</h1>
				<form>
					<input
						type="text"
						placeholder='username'
						onChange={this.handleChange}
						name="username"
						value={this.state.username}
					/>{this.state.errorUsername}<br />
					<input
						type="password"
						placeholder='password'
						onChange={this.handleChange}
						name="password"
						value={this.state.password}
					/>{this.state.errorPassword}<br />
					<select name="department" value={this.state.department} onChange={this.handleChange}>
					  <option value='IT'>IT</option>
					  <option value="Sales">Sales</option>
					  <option value="Accounting">Accounting</option>
					  <option value="Management">Management</option>
					</select>
				</form>
				<button onClick={this.register}>Submit</button>
				<p>{this.state.error.error1}</p>
				<p>{this.state.error.error2}</p>
			</div>
		)
	}
}

export default SignUp;

