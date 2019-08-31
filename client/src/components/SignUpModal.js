import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// Actions
import { addUser } from '../actions/userActions';

export default class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      signUpError: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    this.state.first_name = '';
    this.state.last_name = '';
    this.state.username = '';
    this.state.password = '';
    this.setState({
      modal: !this.state.modal,
      signUpError: ''
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit() {

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      password: this.state.password
    }

    const res = await addUser(newUser);
    // console.log(res);
    if (res.success) {
      this.setState({
        signUpError: ''
      });
      // Close modal
      this.toggle();
    }
    else {
      this.setState({
        signUpError: res.message
      });
    }
  }

  render() {
    const {
      signUpError
    } = this.state;

    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>
          Sign Up
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
          <div className="ErrMsg">
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
          </div>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="user">First Name:</Label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  onChange={this.onChange}
                />
                <Label for="user">Last Name:</Label>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={this.onChange}
                />
                <Label for="user">Username:</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={this.onChange}
                />
                <Label for="user">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>Sign Up</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}