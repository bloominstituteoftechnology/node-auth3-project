import React, { Component } from 'react';
import axios from 'axios';

import Home from '../components/Home';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

export default HomeView;