import React from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

// Component
import AppNavbar from './AppNavbar';

// Actions
import { getCustomer, addCust } from '../actions/customerActions';

class Validate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            validated: false
        };
    }

    async componentDidMount() {
        var self = this;
        // await this.props.getCustomer(this.props.match.params.id);
        const mainUser = await getCustomer(this.props.match.params.id);
        // console.log(mainUser);
        self.setState({
            first_name: mainUser.first_name,
            last_name: mainUser.last_name,
            validated: mainUser.validated
        });
    }

    async onValidateTicket(id) {
        this.props.addCust(id);
        // this.validated = true;
        var self = this;
        self.setState({
            validated: !this.validated
        });
    };

    render() {
        const {
            first_name,
            last_name,
            validated
        } = this.state;

        const ID = this.props.match.params.id;
        const URL = "http://google.com/" + this.props.match.params.id;
        return (
            <div>
                <AppNavbar />
                {
                    (first_name) ? (
                        <h3>Name: {first_name} {last_name}</h3>
                    ) : (null)
                }
                <h2>Validated: {validated ? 'yes' : 'no'}</h2>
                <div id="canvasSignature">
                    <QRCode value={URL} />
                </div>
                <div>
                    {(validated) ? (<div></div>):
                        (<Button color="primary"
                            onClick={
                                this.onValidateTicket.bind(this, ID)
                            }>Validate
                        </Button>)
                    }
                </div>
            </div>
        )
    }
}

Validate.propTypes = {
    getCustomers: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    customerssss: state.customer
});

// export default Validate;
export default connect(mapStateToProps, { getCustomer, addCust })(Validate);