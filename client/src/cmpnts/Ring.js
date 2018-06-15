import React, { Component } from 'react';
import ring from '../oneringGIF.gif';

class Ring extends Component {
    render() { 
        return ( 
            <div className="ring-background">
                <h1 className="four-oh-four">404 Page Not Found</h1>
                <img src={ring} className="ring-logo" alt="logo" /> 
            </div>
         )
    }
}
 
export default Ring;