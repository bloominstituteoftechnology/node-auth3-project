import React from "react";
import { Jumbotron } from "reactstrap";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron className="homeDiv">
          <h1 className="display-3">Auth-ii</h1>
          <p className="lead borderP">
            This is the landing page for Angelina La Salle's HTTP-AJAX Friends
            Project. This web application fulfills the MVP requirements.
          </p>
          <hr className="my-2" />
          <p>
            To navigate this web app, you can utilize the navigation bar at the
            top of the page.
          </p>
        </Jumbotron>
      </div>
    );
  }
}
