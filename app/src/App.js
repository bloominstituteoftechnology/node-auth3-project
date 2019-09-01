import React, { useState, useReducer } from 'react';
import Nav from './components/GlobalComponents/Nav';
import Container from './components/DesignComponents/AppStyles';
import Routes from './Routes';

function App() {
  const api = 'https://users-hooks.herokuapp.com/api';

  return (
    <Container>
      <Nav />
      <Routes api={api} />
    </Container>
  );
}

export default App;
