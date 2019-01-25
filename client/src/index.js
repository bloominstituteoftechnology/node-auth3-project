import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes.js'


ReactDOM.render(
  <Router>
  <Routes/>
  </Router>,
  document.getElementById('root'));

