import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Users extends Component{
  state = {
    users: [],
  };

  componentDidMount(){
    if(!this.props.token){
      this.props.history.push('/');
    }else if(this.props.department === 'Administration'){
      const authOptions = {
        headers: {
          Authorization: this.props.token
        }
      };
      axios.get('http://localhost:8000/api/users/admin', authOptions)
            .then(res => this.setState({ users: res.data }))
            .catch(err => console.log(err));
    }else{
      const authOptions = {
        headers: {
          Authorization: this.props.token
        }
      };
      axios.get('http://localhost:8000/api/users', authOptions)
            .then(res => this.setState({ users: res.data }))
            .catch(err => console.log(err));
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.props.department === 'Administration' ? <h1>You are authorized to view all users</h1> :
                                                      <h1>You are authorized to view the {this.props.department} department users</h1>}
        <div className="users">
          {this.state.users.map(user => <div key={user.id} className="user">
                                          <p>{user.username}</p>
                                          <p>{user.department}</p>
                                        </div>)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return{
    token: state.token,
    department: state.department,
    username: state.username
  }
}

export default withRouter(connect(mapStateToProps)(Users));
