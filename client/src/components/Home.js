import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';
import { Provider } from 'react-redux';
import store from '../store';

// Actions
import { logoutUsers, getUser, getUsers } from '../actions/userActions';

// CSS
import './Home.css';

// Component
import CustomerSignUpModal from './CustomerSignUpModal';
import AppNavbar from './AppNavbar';
import App from '../App';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            first_name: '',
            last_name: '',
            username: '',
            exit: false
        };
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        var self = this;
        const obj = getFromStorage('react_login_app');
        if (obj && obj.token) {
            // console.log(obj);
            const { token } = obj;
            const mainUser = await getUser(token);
            console.log(mainUser);
            self.setState({
                token,
                first_name: mainUser.first_name,
                last_name: mainUser.last_name,
                username: mainUser.username
            });
        }
    }

    async logout() {
        const res = await logoutUsers();
        // console.log(res);
        if (res.success) {
            this.setState({
                first_name: '',
                last_name: '',
                username: '',
                exit: !this.state.exit
            });
        }
    }

    render() {
        const {
            token,
            first_name,
            last_name,
            username,
            exit
        } = this.state;

        if (exit) {
            return (
                <div className="App_CSS">
                    <App />
                    {/* <AppNavbar /> */}
                </div>
            );
        }

        return (
            <div className="Home_CSS">
                <AppNavbar />
                <h1>Ticket System</h1>
                <div className="Profile">
                    <h2>Logged in User</h2>
                    {
                        (first_name) ? (
                            <h3>Name: {first_name} {last_name}</h3>
                        ) : (null)
                    }
                    {
                        (username) ? (
                            <h3>Username: {username}</h3>
                        ) : (null)
                    }
                </div>

                <Row>
                    <Col>
                        <Button color="primary" onClick={this.logout}>Logout</Button>
                    </Col>
                    <Col>
                        <Provider store={store}>
                            <CustomerSignUpModal />
                        </Provider>
                    </Col>
                </Row>
            </div>
        );
    }
}