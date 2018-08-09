import React from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

const Header = Styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    background: lightgray;
`;

const LinkContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    width: 150px;
`;

const Home = () => {
    return (
        <Header>
            <LinkContainer>
                <Link to='/signin'>Log in</Link>
                <Link to='/signup'>Register</Link>
            </LinkContainer>
        </Header>
    )
}

export default Home;