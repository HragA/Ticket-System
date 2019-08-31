import React from 'react';
import { Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getCustomers, deleteCustomer } from '../actions/customerActions';
import PropTypes from 'prop-types';

// Component
import AppNavbar from './AppNavbar';

class Client extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         token: '',
    //         username: '',
    //         admin: false
    //     };
    // }

    async componentDidMount() {
        await this.props.getCustomers();
        // var self = this;
        // const obj = getFromStorage('react_login_app');
        // if (obj && obj.token) {
        //     // console.log(obj);
        //     const { token } = obj;
        //     const mainUser = await getUser(token);
        //     // console.log(mainUser);
        //     self.setState({
        //         token,
        //         username: mainUser.username
        //     });
        // }
    }

    onDeleteClick = (id) => {
        this.props.deleteCustomer(id);
    };

    render() {
        // const { customers } = this.state;
        const { customers } = this.props.customer;
        // const {
        //     token,
        //     username,
        //     admin
        // } = this.state;
        
        // if(username === 'admin' || username === 'sevag') {
        //     console.log("adminnnn");
        //     this.setState({
        //         admin: true
        //     });
        //     console.log(admin);
        // }
        // else {
        //     console.log("nope");
        // }

        return (
            <div>
                <AppNavbar />
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>Validated</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Last Modified</th>
                            <th>Date Created</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(({ _id, validated, first_name, last_name, email, phone, dateLastModified, dateCreated }) => (
                            <tr>
                                <th>
                                    {/* {admin ?  */}
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={
                                            this.onDeleteClick.bind(this, _id)
                                        }>&times;
                                    </Button>
                                    {/* : <div></div>} */}
                                </th>
                                <td>{validated ? 'yes' : 'no'}</td>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{dateLastModified}</td>
                                <td>{dateCreated}</td>
                                <td>{_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
};

Client.propTypes = {
    getCustomers: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    customer: state.customer
});

export default connect(mapStateToProps, { getCustomers, deleteCustomer })(Client);