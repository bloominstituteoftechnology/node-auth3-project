import React from 'react';
import styled from 'styled-components';

const HomeWrap = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    32deg,
    rgba(94, 152, 92, 1) 0%,
    rgba(0, 128, 128, 1) 100%
  );
`;

const Home = props => <HomeWrap>Please sign in to view your content.</HomeWrap>;

export default Home;
