import React, {Component} from 'react';
import axios from 'axios';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          loggedIn: false,
          username: '',
          regusername: '',
          password: '',
          regpassword: '',
        }
    }

    inputHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    })
    }

    //check for token 
    //component did mount 

    render(props){
        return (
            <div>
                <h1>welcome page once logged in</h1>
                <p>will return list of users</p>
            </div>
        )
    }
}

export default Home;