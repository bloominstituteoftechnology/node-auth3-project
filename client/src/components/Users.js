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
        <h1>Hello {this.props.username}!</h1>
        <h3>You are authorized to view the {this.props.department} department users</h3>
        {this.state.users.map(user => <div key={user.id}>
                                        <p>{user.username}</p>
                                        <p>{user.department}</p>
                                      </div>)}
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
