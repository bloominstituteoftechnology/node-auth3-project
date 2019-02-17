import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
            Password: '',
            department:'',
		};
    }
    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
    };

    saveUser=()=>{
		console.log('save user fired')
        axios     
		.post(`http://localhost:8000/api/register`,this.state)
           .then(response => {
			console.log('response'+response);
			localStorage.setItem('jwt',response.data);
			this.props.history.push('/users');
           })
           .catch(err => {
               console.log(err);
           });
    }
    
    submitHandler = event=>{
		event.preventDefault();
		console.log('submitHandler fired')
        this.saveUser();

		// this.props.history.push('/users');
	};

    render(){return(
        <form onSubmit={this.submitHandler}>
					<input
						onChange={this.changeHandler}
						type="text"
						name="userName"
						placeholder="userName"
						value={this.state.userName}
					/>
					<input
						onChange={this.changeHandler}
						type="password"
						name="Password"
						placeholder="Password"
						value={this.state.Password}
					/>
                    	<input
						onChange={this.changeHandler}
						type="text"
						name="department"
						placeholder="department"
						value={this.state.department}
					/>
					<button>Submit</button>
				</form>

    )}
       
    
}




export default SignUp;