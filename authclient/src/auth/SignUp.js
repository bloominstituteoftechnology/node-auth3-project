import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, SubmitBtn, BTNDiv, Errors } from './css';

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
 		event.preventDefault()

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
				<Contain>
					<MainH1>Welcome user sign up here!</MainH1>
					<FlexForm>
						<input
							type="text"
							placeholder='username'
							onChange={this.handleChange}
							name="username"
							value={this.state.username}
						/>{this.state.errorUsername}
						<input
							type="password"
							placeholder='password'
							onChange={this.handleChange}
							name="password"
							value={this.state.password}
						/>{this.state.errorPassword}
						<select name="department" value={this.state.department} onChange={this.handleChange}>
						  <option value='IT'>IT</option>
						  <option value="Sales">Sales</option>
						  <option value="Accounting">Accounting</option>
						  <option value="Management">Management</option>
						</select>
						<SubmitBtn onClick={this.register}>Submit</SubmitBtn>
					</FlexForm>
				</Contain>
				<Link to='/'><BTNDiv><BTN>Need to go back click here!</BTN></BTNDiv></Link>
				<Errors>
					<p>{this.state.error.error1}</p>
					<p>{this.state.error.error2}</p>
				</Errors>
			</div>
		)
	}
}

export default SignUp;

