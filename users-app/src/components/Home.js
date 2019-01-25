import React from "react";
import { Jumbotron } from "reactstrap";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron className="homeDiv bodyRoute">
          <h1 className="display-3">Auth-ii</h1>
          <p className="lead borderP">
            This is the landing page for Angelina La Salle's Auth-ii
            Project. This web application fulfills the MVP requirements and stretch goals.
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
