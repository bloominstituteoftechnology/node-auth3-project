import React, { Component } from 'react'
import LoginMenu from './LoginMenu'
import LoginModal from './LoginModal'

class LoginContainer extends Component {
    state = {
        isLoggingIn: false,
        isRegistering: false,
        isLoggedIn: false,
    }

    loggingIn = boolean => {
        this.setState({
            isLoggingIn: boolean
        })
    }

    registering  = boolean => {
        this.setState({
            isRegistering: boolean
        })
    }

    render(){
        const {isLoggingIn, isRegistering, isLoggedIn} = this.state
        if(localStorage.getItem('jwt')) this.props.history.push('/users');
        return(
            <>
            {isLoggingIn && <LoginModal registering = {this.registering} loggingIn = {this.loggingIn} message='Login'/>}
            {isRegistering && <LoginModal registering = {this.registering} loggingIn = {this.loggingIn} message='Register'/>}
            <LoginMenu {...this.props} registering = {this.registering} loggingIn = {this.loggingIn}/>
            
            </>
        )
    }
}

export default LoginContainer