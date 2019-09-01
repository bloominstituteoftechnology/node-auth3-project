import React, { useState } from 'react';
import { Container, Form } from '../DesignComponents/FormStyles';
import axios from 'axios';

const defaultState = {
  username: '',
  password: '',
  department: ''
};

const Register = ({ api, history }) => {
  const [form, setForm] = useState(defaultState);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${api}/auth/register`, form)
      .then(({ data }) => {
        localStorage.setItem('token', `bearer ${data.token}`);
      })
      .then(() => {
        history.push('/users');
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
        <input
          type='text'
          name='username'
          value={form.username}
          onChange={handleChange}
        />
        <input
          type='text'
          name='department'
          value={form.department}
          onChange={handleChange}
        />
        <input
          type='text'
          name='password'
          value={form.password}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </Form>
    </Container>
  );
};

export default Register;
