import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'

// Actions
import { addCustomer } from '../actions/customerActions';

export default class CustomerSignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      signUpError: '',
      redirect: false,
      ticketId: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    this.state.first_name = '';
    this.state.last_name = '';
    this.state.email = '';
    this.state.phone = '';
    this.setState({
      modal: !this.state.modal,
      signUpError: ''
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit() {

    const newTicket = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone
    }

    const res = await addCustomer(newTicket);
    // console.log(res.customersData.customer._id);
    if (res.success) {
      this.setState({
        signUpError: ''
      });
      // Close modal
      this.toggle();

      this.setState({
        ticketId: res.customersData.customer._id,
        redirect: true
      });
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

    if (this.state.redirect) {
      return (
        <Redirect to={"/validate/" + this.state.ticketId} />
      );
    }
    else {
      return (
        <div>
          <Button color="secondary" onClick={this.toggle}>
            Create Ticket
        </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Create Ticket</ModalHeader>
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
                  <Label for="user">Email:</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                  <Label for="user">Phone:</Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmit}>Create Ticket</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}