import React from "react";
import {  useForm} from "react-hook-form";
import {  axiosWithAuth}  from "../util/axiosWithAuth.js"
import {  Link } from 'react-router-dom'
import {  Login, 
          Container, 
          Button, 
          Otherbutton, 
          Body, 
          Formgroup, 
          Styledform, 
          Labels, 
          Inputs  
} from "../styles/LoginRegisterStyles"


export default function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm();


  const onSubmit = data => {
   

    axiosWithAuth()
      .post("http://localhost:4000/api/auth/login", data)

      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.token);
        props.history.push("/users");
      })
      .catch(err => {
        alert((err.message = "Invalid Username or Password"));
        console.log(err.response);
      });
  };


return (
  <Container>
    <Login>Login</Login>
    <Body>
      Enter your username and password. Your privacy is important to us and will
      not be shared.
    </Body>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Styledform>
        <Formgroup>

          {/* Start of UserName field */}
          <Labels htmlFor='username'>
            User Name
            <Inputs
              type='text'
              name='username'
              placeholder='username'
              ref={register({ required: true, minLength: 6, maxLength: 15 })}
            />
          </Labels>
          {errors.username && errors.username.type === "required" && (
            <span>Please enter a username</span>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <span>Username is too short</span>
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <span>Username is too long</span>
          )}

          {/* End of UserName Field */}

          {/* Start of Password Field */}
          <Labels htmlFor='password'>
            <span>
              {" "}
              No Account?
              <Otherbutton tag={Link} to='/signup'>
                Sign Up
              </Otherbutton>
            </span>
            Password
          </Labels>
          <Inputs
            type='password'
            placeholder='Password'
            name='password'
            ref={register({ required: true, minLength: 5 })}
          />

          {errors.password && errors.password.type === "required" && (
            <span>Password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>Password is too short - 5 characters</span>
          )}
          {/* End of password field  */}
        </Formgroup>

        <div className='footer'>
          <Button>Submit</Button>
        </div>

      </Styledform>
    </form>
  </Container>
);
}

