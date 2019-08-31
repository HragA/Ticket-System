import axios from 'axios';
import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER, ADD_CUST, DELETE_CUSTOMER, CUSTOMERS_LOADING } from './customerTypes';

// Get All Customers
export const getCustomers = () => dispatch => {
    // return {
    //     type: GET_CUSTOMERS
    // };
    dispatch(setCustomersLoading);
    axios
        .get('/api/customers/')
        .then(res => 
            dispatch({
                type: GET_CUSTOMERS,
                payload: res.data
            })
        );
        // .then(function (res) {
        //     console.log(res.data);
        //     dispatch({
        //         type: GET_CUSTOMERS,
        //         payload: res.data
        //     })
        // });
};

//Get One Customer
export async function getCustomer(id) {
    // return {
    //     type: GET_CUSTOMER
    // };
    // dispatch(setCustomersLoading);
    // axios
    //     .get(`/api/customers/cust/${id}`)
    //     .then(res =>
    //         dispatch({
    //             type: GET_CUSTOMER,
    //             payload: res.data
    //         })
    //     )

    var userData;
    await axios
        .get('/api/customers/cust/' + id)
        .then(function (res) {
            userData = res.data;
        });
    return userData;
};

// Add's a Customer
// export const addCustomer = (customer) => dispatch => {
export async function addCustomer(newUser) {
    // return {
    //     type: ADD_CUSTOMER,
    //     payload: customer
    // };

    // axios
    //     .post('/api/customers/', customer)
    //     .then(res => dispatch({
    //         type: ADD_CUSTOMER,
    //         payload: res.data
    //     })
    //     )

    var data_success, data_error, customersData;
    await axios
        .post('/api/customers/', newUser)
        .then(function (res) {
            // console.log(res);
            data_success = res.data.success;
            data_error = res.data.message;
            customersData = res.data;
        })
    const data = {
        customersData: customersData,
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
};

// Validate a Customer
export const addCust = (id) => dispatch => {
    // return {
    //     type: ADD_CUSTOMER,
    //     payload: customer
    // };
    axios.post(`/api/customers/cust/${id}`).then(res => 
        dispatch({
            type: ADD_CUST,
            payload: res
        })
    )
};

// Deletes The Customer
export const deleteCustomer = (id) => dispatch => {
    // return {
    //     type: DELETE_CUSTOMER,
    //     payload: id
    // };
    axios.delete(`/api/customers/${id}`).then(res =>
        dispatch({
            type: DELETE_CUSTOMER,
            payload: id
        })
    )
};

export const setCustomersLoading = () => {
    return {
        type: CUSTOMERS_LOADING
    };
};