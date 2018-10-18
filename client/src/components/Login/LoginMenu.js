import React from 'react'
import {StyledButton} from '../styles/styles'
import styled from 'react-emotion'

const LoginMenu = props => {
    return(
    <div>
        <h1>Account Set-Up</h1>
        <img src='http://www.smosh.com/wp-content/uploads/bloguploads/dumb-sonic-20.gif' />
        <StyledButtonWrapper>
            <StyledButton onClick={() => props.loggingIn(true)} >Login</StyledButton>
            <RegisterButton onClick={() => props.registering(true)} >Register</RegisterButton>
        </StyledButtonWrapper>

    </div>
    )
}

export default LoginMenu

const StyledButtonWrapper = styled('div')`
    display:flex;
    width: 200px;
    margin: auto;
    justify-content: center;
`

const RegisterButton = styled(StyledButton)`
:hover{
    background: #EB3E4A;
}
`