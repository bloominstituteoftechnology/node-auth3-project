import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Home extends Component {  
    render() {
        return (
            <div>
                <Link to = '/register'>Register</Link>
                <Link to = '/login'>Login</Link>
            </div>            
        );
    }
}

export default Home;