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
import { URL, DEFAULT_REGISTER_VALUES } from "../../../constants";

const SignUp = ({ history }) => {
  const [input, setInput] = useState(DEFAULT_REGISTER_VALUES);
  const handleChange = e =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${URL}register`, input)
      .then(res => {
        if (res.status === 201) {
          setInput(DEFAULT_REGISTER_VALUES);
          history.push("/login");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.error(err);
        setInput(DEFAULT_REGISTER_VALUES);
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
          <Input
            type="department"
            name="department"
            placeholder="department"
            onChange={handleChange}
            value={input.department}
          />
          <Button onClick={handleSubmit} onSubmit={handleSubmit}>
            Log In
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
