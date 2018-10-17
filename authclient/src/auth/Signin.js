import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, SubmitBtn, BTNDiv, LogErr } from './css';


class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			error: localStorage.getItem("error"),
		};
	}

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	}

 	signin = event => {
 		event.preventDefault();
 		//console.log('its working')
 		axios.post('http://localhost:5555/api/login', this.state)
 		.then(response => {
 			console.log(response.data)
 			localStorage.setItem('jwt', response.data.token);
 			this.props.history.push('/users')
 		})
 		.catch(error => {
 			console.log(error)
 		})
 	}

 	clear = event => {
 		localStorage.removeItem('error');
 	}

	render() {
		return (
			<div>
				<LogErr>{this.state.error}</LogErr>
				<Contain>
					<MainH1>Welcome User Sign in here!</MainH1>
					<FlexForm>
						<input
							type="text"
							placeholder='username'
							onChange={this.handleChange}
							name="username"
							value={this.state.username}
						/>
						<input
							type="password"
							placeholder='password'
							onChange={this.handleChange}
							name="password"
							value={this.state.password}
						/>
						<SubmitBtn onClick={this.signin}>Signin</SubmitBtn>
					</FlexForm>

				</Contain>
				<Link to='signup'><BTNDiv onClick={this.clear}><BTN>No account Sign up here!</BTN></BTNDiv></Link>
			</div>
		)
	}
}

export default Signin;
