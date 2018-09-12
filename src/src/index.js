import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
