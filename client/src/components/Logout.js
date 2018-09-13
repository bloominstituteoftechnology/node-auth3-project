import React, {Component} from 'react'; 


export default class Logout extends Component {
    
    
    logoutUser = e => {
        localStorage.removeItem('jwt');
        this.props.history.push('/login');
    }

    render(){
        return (
            <div>
                <div>Are you sure you want to Logout?</div>
                <button className="form-button" onClick={this.logoutUser}>Logout</button>            
            </div>
        )
    }
}