import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Col, Card, CardBody, CardColumns, Container } from "reactstrap";
import NavBar from './navBar';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wutizit: []
    };
  }

  componentDidMount() {
    this.getSession();
  }

  getSession = () => {
    const config = {
                 headers: {
                    "Authorization": localStorage.authorization
                 }
             }
    axios
      .get(`http://localhost:5500/api/users`, config)
      .then(res => {
        console.log(res.data);
        this.setState({ wutizit: res.data });
      })
      .catch(error => {
        console.log({ error: error.message });
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <h3>Welcome {this.state.wutizit.username}</h3>
        <Container style={{ display: "flex", justifyContent: 'center' }} >
        <CardColumns>
          {this.state.wutizit.map(user => {
            return (
            <Card key={user._id} style={{ margin: '20px 0px 20px 0px', boxShadow: '2px 2px 6px black'}} >
           <CardBody>
               <h4>User:</h4>
            <p style={{ fontSize: '1.3rem'}}>{user.username}</p>
           <Link to="/dashboard">
            <p>Profile</p>
            </Link>
           </CardBody>
            </Card>
          )})}
        </CardColumns>
      </Container>
      </div>
    );
  }
}

export default Users;
