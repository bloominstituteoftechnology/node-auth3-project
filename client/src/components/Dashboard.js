import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

class Dashboard extends Component {
   render() {
      if (this.props.loading) {
         return <h1>{this.props.message}</h1>;
      } else {
         if (!this.props.isLoggedIn) {
            return <Redirect to="/login" />;
         } else if (this.props.users) {
            return (
               <div>
                  {this.props.users.map(user => (
                     <div>
                        <h1>{user.name}</h1>
                        <h2>{user.department}</h2>
                     </div>
                  ))}
               </div>
            );
         }
      }
   }
}

const mapStateToProps = state => {
   return {
      users: state.users,
      loading: state.loading,
      message: state.message,
      isLoggedIn: state.isLoggedIn,
   };
};

export default connect(mapStateToProps)(Dashboard);
