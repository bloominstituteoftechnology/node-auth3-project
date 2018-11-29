import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  FormContainer,
  Form,
  Input,
  Button,
  Heading
} from "../styles";
import { URL, DEFAULT_LOGIN_VALUES } from "../../../constants";

const Login = ({ history }) => {
  const [input, setInput] = useState(DEFAULT_LOGIN_VALUES);
  const handleChange = e =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${URL}login`, input)
      .then(res => {
        if (res.status === 200 && res.data) {
          localStorage.setItem("token", res.data.token);
          setInput(DEFAULT_LOGIN_VALUES);
          history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.error(err);
        setInput(DEFAULT_LOGIN_VALUES);
      });
  };

  return (
    <Container>
      <FormContainer>
        <Form>
          <Heading>JWT Authentication</Heading>
          <Input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={input.username}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={input.password}
          />
          <Button onClick={handleSubmit} onSubmit={handleSubmit}>
            Log In
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;
