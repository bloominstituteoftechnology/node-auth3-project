import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component {
    state ={
        users: []
    };

 

componentDidMount(){
console.log('in CDM')
    this.pleaseWork()
}

pleaseWork(){
    console.log('please work')
    const token = localStorage.getItem('jwt')
    const options = {
        headers: {
            Authorization: token,
        },
    };
     axios
    .get('http://localhost:4000/api/users', options)
    .then(res => {
   
        this.setState({users: res.data.users})
 
        console.log(this.state.users)
        
    })
    .catch(err => {console.log(err)})
}

render(){
return(
    <div>
    <h1>Say hi</h1>
    <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <button onClick={this.props.signout}>Sign Out</button>
    </div>
)}

}

export default Users;