import React, { Component } from 'react';

import Home from '../Home';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Home { ...this.props }/>
        )
    }
}

export default HomeView;