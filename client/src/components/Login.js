import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';

// Actions
import { signinUser } from '../actions/userActions';

// Components
import SignUpModal from './SignUpModal';
import CustomerSignUpModal from './CustomerSignUpModal';
import App from '../App';
import AppNavbar from './AppNavbar';

// CSS
import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            signInError: '',
            token: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit() {
        const loginUser = {
            username: this.state.login_username,
            password: this.state.login_password
        }

        const res = await signinUser(loginUser);
        console.log(res);
        if (res.success) {
            this.setState({
                signInError: res.message,
                token: res.token
            });
        }
        else {
            this.setState({
                signInError: res.message
            });
        }
    }

    render() {
        const {
            signInError,
            token
        } = this.state;

        if (!token) {
            return (
                <div className="Login_CSS">
                    <div className="jumbotron">
                        <Container>
                            <h1>Login</h1>
                            <Form>
                                <FormGroup>
                                    <Input
                                        type="string"
                                        name="login_username"
                                        id="login_username"
                                        placeholder="Username"
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="password"
                                        name="login_password"
                                        id="login_password"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                            </Form>
                            <Row>
                                <Col>
                                    {
                                        (signInError) ? (
                                            <p>{signInError}</p>
                                        ) : (null)
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SignUpModal />
                                </Col>
                                <Col>
                                    <Button color="primary" onClick={this.onSubmit}>Login</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            );
        }

        return (
            <div className="App_CSS">
                {/* <AppNavbar /> */}
                <App />
            </div>
        );
    }
}