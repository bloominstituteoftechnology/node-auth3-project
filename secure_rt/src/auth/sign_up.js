// import React, { Component } from 'react';
// import { Button, Form, Input } from 'reactstrap';
// import Loader from 'react-loader-spinner';
// import axios from 'axios';

// class Signup extends Component {
//     state = {
//         username: '',
//         password: '',
//         department: ''
//     }   

//     handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };
   
//     signup = e => {
//         e.preventDefault();
//         //const endpoint = `${process.env.API_URL}/api/auth/register`;
//         const endpoint = 'https://localhost:7000/api/auth/register';

//         axios
//             .post(endpoint, this.state)
//             .then(res => {
//                 localStorage.setItem('jwt', res.data.token);
//                 console.log(res.data)
//                 this.props.history.push('/users');
//             })
//             .catch(err => console.log(err));
//     };

//     render() {
//         console.log('You are in the Signup page!');
//         return (
//             <Form onSubmit={this.signup}>
//                 <h3>Welcome!<br/>Please Sign up for an Account with us!</h3>
//                 <Input 
//                     type='text'
//                     placeholder='username'
//                     name='username'
//                     value={this.state.username}
//                     onChange={this.handleInputChange}
//                 />
//                 <Input 
//                     type='password'
//                     placeholder='password'
//                     name='password'
//                     value={this.state.password}
//                     onChange={this.handleInputChange}
//                 />
//                 <Input 
//                     type='text'
//                     placeholder='department'
//                     name='department'
//                     value={this.state.department}
//                     onChange={this.handleInputChange}
//                 /> 
//                 <Button type='submit'>
//                     <Loader type="ThreeDots" color="green" height='12' width='37' /> SignUp
//                 </Button>   
//             </Form>
//         )
//     }
// };

// export default Signup;
