import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron
} from "reactstrap";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      info: {
        username: "",
        password: "",
        department: ""
      },
      toUsers: false,
      error: false,
      errorMessage: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  }

  inputChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      info: {
        ...this.state.info,
        [e.target.name]: e.target.value
      }
    });
  };

  componentWillMount() {
    this.setState({
      modal: false,
      info: {
        username: "",
        password: "",
        department: ""
      },
      toUsers: false,
      error: false,
      errorMessage: ""
    });
  }

  register = e => {
    e.preventDefault();
    const creds = this.state.info;
    const endpoint = "http://localhost:4200/api/register";
    axios
      .post(endpoint, creds)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.setState({
          ...this.state,
          info: { username: "", password: "", department: "" },
          toUsers: true,
          error: false,
          errorMessage: ""
        });
      })
      .catch(err => {
        this.setState({ ...this.state, error: true, errorMessage: err });
      });
  };

  render() {
    if (this.state.toUsers) {
      return <Redirect to="/users" />;
    } else if (this.state.error) {
      return (
        <div>
          <Jumbotron className="homeDiv bodyRoute">
            <h1 className="display-3">Registration Error</h1>
            {/* <p className="lead borderP">
            {this.state.errorMessage}
          </p> */}
            <hr className="my-2" />
            <p>{`${this.state.errorMessage}`}</p>
          </Jumbotron>
        </div>
      );
    }
    return (
      <div>
        <Jumbotron className="homeDiv bodyRoute">
          <Button className="button" color="danger" onClick={this.toggle}>
            Register
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Register</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  this.register(e);
                  this.toggle(e);
                }}
              >
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    onChange={this.inputChange}
                    value={this.state.info.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="text"
                    name="password"
                    onChange={this.inputChange}
                    value={this.state.info.password}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="department">Department</Label>
                  <Input
                    type="text"
                    name="department"
                    onChange={this.inputChange}
                    value={this.state.info.department}
                  />
                </FormGroup>
                <Button type="submit">Submit</Button>
              </Form>
            </ModalBody>
          </Modal>
        </Jumbotron>
      </div>
    );
  }
}
