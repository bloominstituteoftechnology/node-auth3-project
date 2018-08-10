import React from 'react';
import {Link} from 'react-router-dom';


const HomePage = () => {
    return (
        <div>
            <div>
                <Link to='/login'>Login</Link>
                </div>
                <div>
                <Link to='/register'>Register A New User</Link>
            </div>
        </div>
    )
}

export default HomePage;
