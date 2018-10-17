// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import ExampleComponent from './ExampleComponent';

//Styles
const AppContainer = styled.div`
	display: flex;
	max-width: 880px;
	height: 100vh;
	background: #c7e8f1;
	margin: 0 auto;
`;

class App extends Component {
	render() {
		return (
			<AppContainer>
				{/* <Navbar /> */}
				<Route exact path="/" component={ExampleComponent} />
			</AppContainer>
		);
	}
}

export default App;
