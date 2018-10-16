import styled from 'styled-components';

export const Contain = styled.div`
	max-width: 500px;
	margin: 80px auto;
	border: solid black 1px;
	background-color: lightblue;
	margin-bottom: 20px;
`

export const MainH1 = styled.h1`
	text-align: center;
	font-size: 20px
`

export const FlexForm = styled.form`
	display: flex;
	flex-direction: column;
	margin: 0 10%;
	margin-bottom: 20px;
	border: 1px solid blue;
`

export const BTN = styled.button`
	border: solid green 1px;
	background-color: lightgreen;
	&:hover {
		background-color: green;
		color:lightgreen;
		cursor: pointer;
	}
`

export const SubmitBtn = styled.button`
	&:hover {
		cursor: pointer
		background-color: lightgrey;
		border: solid grey 1px;
	}
`

export const BTNDiv = styled.div`
	display: flex;
	justify-content: center;
`

export const Errors = styled.div`
	color: red;
	text-align: center;
	font-size: 20px;
`