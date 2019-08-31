// import uuid from 'uuid';
import{ GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER, ADD_CUST, DELETE_CUSTOMER, CUSTOMERS_LOADING } from '../actions/customerTypes';

const initialState = {
    customers: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload,
                loading: false
            };
        case GET_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
                loading: false
            };
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(customer => customer._id !== action.payload)
            };
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [action.payload]
            };
        case ADD_CUST:
            return {
                ...state,
                customers: [action.payload, ...state.customers]
            };
        case CUSTOMERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}