import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	componentDidMount(){

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


	render() {
		return (
			<div>
				
				<form>
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
				</form>
				<button onClick={this.signin}>Signin</button>


			</div>
		)
	}
}

export default Signin;
