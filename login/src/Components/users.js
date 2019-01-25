import React from 'react';
import '../App.css';
import axios from 'axios';


class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          users: [],
          deniedAccess: true,
          userDepartment: '',
        }
      }
    
    componentDidMount = () => {
        const token = localStorage.getItem('jwt');
        const department = localStorage.getItem('department');
        const options = {
            headers: {
                Authorization: token,
            }
        }
        axios.get('http://localhost:3500/api/users', options)
          .then(response => {
              console.log(response)
            this.setState({ 
                users: response.data,
                deniedAccess: false,
                userDepartment: department,
            })
          })
          .catch(err => {
              this.setState({
                  deniedAccess: true
              })
          })
    }

     content = () => {
        const isLoggedIn = this.deniedAccess;
        if (!isLoggedIn) {
          return (
            <div>
                <h1 className="header">Users</h1>
                <ul className='outerdiv'>
                    {this.state.users.map(item => {
                        if(item.department === this.state.userDepartment){
                            return (
                            <div key={item.username} className="user">
                                <p>{item.username}</p>
                            </div>
                        )
                    } 
                    })}
                </ul>
            </div>
          )
        }
        return(
            <div>
                <p>You must be logged in to view users.</p>
            </div>
        );
      }

    render(){
        return(
            < this.content />
        )
    }
}

export default Users;