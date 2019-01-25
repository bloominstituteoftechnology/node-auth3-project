import React from 'react';
import '../App.css';
import axios from 'axios';


class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          users: [],
        }
      }
    
    componentDidMount = () => {
        axios.get('http://localhost:3500/api/users')
          .then(response => {
            this.setState({ users: response.data })
          })
          .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <h1 className="header">Users</h1>
                <ul className='outerdiv'>
                    {this.state.users.map(item => {
                        return (
                            <div key={item} className="user">
                                <p>{item}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Users;