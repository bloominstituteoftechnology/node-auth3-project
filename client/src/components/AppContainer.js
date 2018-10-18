import React, { Component } from 'react'
import LoginContainer from './Login/LoginContainer'
import Navigator from './Navigator/Navigator.js'
import HomeContainer from './Home/HomeContainer'
import { injectGlobal } from 'emotion';
import { Route } from 'react-router-dom'
import UserContainer from './User/UserContainer';

class AppContainer extends Component {
    state = {}

    render(){
        return(
            <>
            <Route path='/' render={props => <Navigator {...props} />} />
            <Route exact path='/' render={props => <HomeContainer {...props} />} />
            <Route exact path='/login' render={props => <LoginContainer {...props} />} />
            <Route exact path='/users' render={props => <UserContainer {...props}/>} />

            </>
        )
    }
}


export default AppContainer

injectGlobal`
box-sizing: border-box;
`

