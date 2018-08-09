import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

const Header = Styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
    width: 200px;
`;

const Home = () => {
    return (
        <Header>
            <Link to='/signin'>Log in</Link>
            <Link to='/signup'>Register</Link>
        </Header>
    )
}

export default Home;