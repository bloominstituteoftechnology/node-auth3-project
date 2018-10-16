import React from 'react';
import styled from 'styled-components'

const EmployeeDiv = styled.div`
	border:solid black 1px;
	max-width: 600px;
	margin: 10px auto;
	width: 25%;
	padding: 2%;
	background-color: lightgreen;
`


const User = (props) => {
	return (
		<EmployeeDiv>
			<p>Name: {props.user.username} Department: {props.user.department} </p>
		</EmployeeDiv>
	)
}

export default User;
