import axios from 'axios';

// Get One Customer
export async function getCustomer(id) {
    var customerData;
    // console.log("id: " + id);
    await axios
        .get('/api/customers/cust/' + id)
        .then(function (res) {
            // console.log(res.data);
            customerData = res.data;
        });
    // console.log(customerData);
    return customerData;
}

// Get All Customers
export async function getCustomers() {
    const customer = {};
    await axios
        .get('/api/customers/')
        .then(function (res) {
            // console.log(res);
            // console.log(res.data);
            for (var i = 0; i < res.data.length; i++) {
                customer[i] = res.data[i];
                // console.log(customer[i]);
            }
        })
    // console.log(customer);
    // console.log(customer.length);
    // for (var i = 0; i < customer.length; i++) {
    //     console.log(customer[i]);
    // }
    return customer;
}

// Add's a Customer
export async function addCustomer(newUser) {
    var data_success, data_error;
    await axios
        .post('/api/customers/', newUser)
        .then(function (res) {
            // console.log(res);
            data_success = res.data.success;
            data_error = res.data.message;
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
}

// Validate a Customer
export async function addCust(id) {
    var data_success, data_error;
    await axios
        .post('/api/customers/cust/', id)
        .then(function (res) {
            // console.log(res);
            data_success = res.data.success;
            data_error = res.data.message;
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
}

// Deletes The Customer
export async function deleteCustomer(id) {
    await axios
        .delete('/api/customers/' + id)
}