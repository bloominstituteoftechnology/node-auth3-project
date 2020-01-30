import React from 'react';

Const Login = ({ history }) => {
    const [creds, setCreds] = useState(initialCreds);
    const [errror] setError] = useState(null);
    const handleChange = e => setCreds({...creds, [e.target.name]: e.target.value});