import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  cardContainer: {
    'marginTop': '2rem',
    'display': 'grid',
    'justifyContent': 'center',
    'grid-template-columns': '30% 30%',
    'grid-gap': '20px 20px'
  }
};

class Users extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchUsers(token);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='users'>
        {
          this.props.error
          ? <React.Fragment>
              <Typography variant='headline' color='error'>{this.props.error}</Typography><br />
            </React.Fragment>
          : null
        }
        <div className={classes.cardContainer}>
          {this.props.users.map(user => {
            return (
              <Card className={classes.card} key={user.id}>
                <CardContent>
                  <Typography variant='headline'>
                    {user.username}
                  </Typography>
                  <Typography variant='subheading'>
                    {user.department}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Users);
