import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Users from "./Users/Users";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup"
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
const Home = props => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const App = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <header className="App-header">
        <AppBar className="App-Bar" position="static">
          <Toolbar variant="dense">
            <NavLink to="/" className={classes.grow} exact>
              <Typography
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </Typography>
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup" exact>
              <Typography variant="h6" color="inherit">
                Signup
              </Typography>
            </NavLink>

            &nbsp;|&nbsp;
            <NavLink to="/signin" exact>
              <Typography variant="h6" color="inherit">
                Signin
              </Typography>
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users" exact>
              <Typography variant="h6" color="inherit">
                Users
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>

        <Route path="/" component={Home} exact />
        <Route path="/users" component={Users} exact />
        <Route path="/signin" component={Signin} exact />
        <Route path="/signup" component={Signup} exact />
      </header>
    </div>
  );
};

export default withStyles(styles)(App);
