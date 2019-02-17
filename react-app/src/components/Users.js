import React from 'react';
import axios from 'axios';

class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount(){
        const token=localStorage.getItem('jwt');
        const options={
            headers:{Authorization:token}
        }
        axios.get('http://localhost:8000/api/users',options)
        .then(res=>{
            this.setState({list: res.data});
            console.log(this.state);
        }

        ).catch(err=>console.log(err))
    }
    render(){
        return(<div>

            <h1>Users</h1>
            {this.state.list.map(
                item=>{return(
                    <div key={item.id}>
                    <div>username:{item.userName}</div>
                    <div>department:{item.department}</div>
                    </div>
                )}
            )}
            </div>

        )
    }
}

export default Users;