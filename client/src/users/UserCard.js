import React from 'react';
import { Collapse, Button, CardBody, CardTitle, CardSubtitle, Card } from 'reactstrap';

class UserCard extends React.Component {
    constructor(props) {
      super(props);

      this.state = { 
          collapse: false 
        };
    }
  
    toggle = () => {
      this.setState(state => ({ collapse: !state.collapse }));
    }
  
    render() {
      return (
        <div>
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>
            { this.props.u.username }
          </Button>
          
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <CardTitle>{ this.props.u.dept }</CardTitle>
                <CardSubtitle>{ this.props.u.id }</CardSubtitle>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      );
    }
  }
  
  export default UserCard;