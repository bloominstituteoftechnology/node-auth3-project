import React from "react";
import axios from "axios";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardColumns,
  Jumbotron
} from "reactstrap";

const jwt = require("jsonwebtoken");

export default class Users extends React.Component {
  state = {
    users: [],
    error: false,
    errorMessage: ""
  };
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:4200/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      const decoded = jwt.decode(token);
    const department = decoded.department;
    axios
      .get(endpoint, options)
      .then(res => {
        const filtered = res.data.filter(
          user => user.department === department
        );
        this.setState({ users: filtered, error: false, errorMessage: "" });
      })
      .catch(err => {
        this.setState({ error: true, errorMessage: err });
      });
    }
    
  }

  deleteUser = user => {
    const token = localStorage.getItem("jwt");
    const endpoint = "http://localhost:4200/api/users";
    const options = {
      headers: {
        Authorization: token
      }
    };
    axios
      .delete(`http://localhost:4200/api/users/${user.id}`)
      .then(res => {
        axios
          .get(endpoint, options)
          .then(res =>
            this.setState({ users: res.data, error: false, errorMessage: "" })
          )
          .catch(err => this.setState({ error: true, errorMessage: err }));
      })
      .catch(err => this.setState({ error: true, errorMessage: err }));
  };

  render() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return (
        <div>
          <Jumbotron className="homeDiv bodyRoute">
            <h1 className="display-3">Error</h1>
            <p className="lead borderP">{`${this.state.errorMessage}`}</p>
            <hr className="my-2" />
            <p>You must either register or login</p>
          </Jumbotron>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div>
          <Jumbotron className="homeDiv bodyRoute">
            <h1 className="display-3">Error</h1>
            <hr className="my-2" />
            <p>{`${this.state.errorMessage}`}</p>
          </Jumbotron>
        </div>
      );
    }
    return (
      <div className="listDiv bodyRoute">
        <div className="padding">
          <CardColumns>
            {this.state.users.map(user => (
              <div key={user.id}>
                <Card sm="6">
                  <CardBody>
                    <CardTitle>{user.username}</CardTitle>
                    <CardSubtitle>{`Id: ${user.id}`}</CardSubtitle>
                    <CardSubtitle>{`Department: ${
                      user.department
                    }`}</CardSubtitle>
                    <Button onClick={() => this.deleteUser(user)}>{`Delete ${
                      user.username
                    }`}</Button>
                  </CardBody>
                </Card>
              </div>
            ))}
          </CardColumns>
        </div>
      </div>
    );
  }
}
