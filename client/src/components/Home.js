import React from "react";
import { Link } from "react-router-dom";

const Home = props => {
    return (
        <div className="App" >
            <Link to="/register" > Sign up </Link >
            <Link to="/login" > Log In </Link >
        </div >
    );
};

export default Home;