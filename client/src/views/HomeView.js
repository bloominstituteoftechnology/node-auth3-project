import React, { Component } from 'react';
import axios from 'axios';

import Home from '../components/Home';

class HomeView extends Component {
    constructor(props)
    
    render() {
        return (
            <Home {...props} />
        )
    }
}

export default HomeView;