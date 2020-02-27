import React from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../util/axiosWithAuth";

import { Login, 
  Container, 
  Button, 
  Body, 
  Otherbutton, 
  Formgroup, 
  Styledform, 
  Labels, 
  Inputs } from "../styles/LoginRegisterStyles";

  
export default function SignUpForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    axiosWithAuth()
      .post("http://localhost:4000/api/auth/register", data)

      .then(res => {
        console.log("success", res);

        localStorage.setItem("token", res.data.token);
        props.history.push("/users");
      })
      .catch(err => alert(err.response.data.username));
  };

  return (
    <div className='base-container'>
      {/* <img src ={loginImg} alt="construction"/> */}

      <Container>
        <Login>Sign Up</Login>
        <Body>
          Enter a username and password to create your account. Your privacy is
          important to us and will not be shared.
        </Body>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Styledform>
            <Formgroup>
              {/* Start of UserName field */}
              <div className='rectangle'>
                <Labels htmlFor='username'>
                  User Name
                  <Inputs
                    type='text'
                    placeholder='username'
                    name='username'
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 15
                    })}
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
              </div>
              {/* End of UserName Field */}

              <Labels htmlFor='password'>
              <span>
                  Already a user?
                  <Otherbutton tag={Link} to='/'>
                    Sign In
                  </Otherbutton>
                </span>
                Password{" "}
               
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

              {/* <Labels htmlFor='role'>
                Select your role
                <select
                  name='role'
                  className='select'
                  ref={register({ required: true })}>
                  {errors.role && errors.role.type === "required" && (
                    <span>Role is required</span>
                  )}
                  <option value='2'>Diner</option>
                  <option value='1'>Operator</option>
                </select>
              </Labels> */}
            </Formgroup>

            <div className='footer'>
              <Button>Submit</Button>
            </div>
          </Styledform>
        </form>
      </Container>
    </div>
  );
}
