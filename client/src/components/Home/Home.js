import React from "react";
import axios from "axios";
import { Card, CardBody, CardText } from "reactstrap";
import { withRouter } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get("http://localhost:5500/api/users", requestOptions)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <div className="message">
        {localStorage.getItem("jwt") ? (
          this.state.users.map(user => {
            return (
              <Card key={user._id}>
                <CardBody>
                  <CardText>Username: {user.username}</CardText>
                  <CardText>Race: {user.race}</CardText>
                </CardBody>
              </Card>
            );
          })
        ) : (
          <h4>
            You must log in to your account to view all of our users. If you do
            not have an account please feel free to click on the register button
            to sign up. Thank you!
          </h4>
        )}
      </div>
    );
  }
}


export default withRouter(Home);