import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <section className="content">
            <Link to="/auth/login">Login</Link>
        </section>
    );
};

export default Home;