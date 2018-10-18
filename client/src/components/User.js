import React from 'react';

// Styles
import styled from 'styled-components';

const UserDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	wrap-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid white;
	border-radius: 5px;
	width: 50%;

	&:hover {
		background-color: #888;
		color: black;

		p {
			font-weight: bold;
		}
	}

	p {
		text-align: center;
	}
`;

const User = props => {
	const { user } = props;
	return(
		<UserDiv>
			<p>ID: { user.id }</p>
			<p>Username: { user.username }</p>
			<p>Department: { user.department }</p>
		</UserDiv>
	);
};

export default User;
