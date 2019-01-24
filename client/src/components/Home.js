import React, { Component } from "react";
import { UikWidget, UikHeadline, UikHeadlineDesc } from "../@uik";
import "../@uik/styles.css";

class Home extends Component {
  render() {
    return (
      <UikWidget padding>
        <UikHeadline>Home</UikHeadline>
        <UikHeadlineDesc>Authentication with tokens is great!</UikHeadlineDesc>
      </UikWidget>
    );
  }
}

export default Home;
