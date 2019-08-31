import axios from 'axios';

import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Get One User
export async function getUser(token) {
    var userData;
    const id = await getToken(token);
    // console.log("id: " + id);
    await axios
        .get('/api/users/user/' + id)
        .then(function (res) {
            // console.log(res.data);
            userData = res.data;
        });
    // console.log(userData);
    return userData;
}

// Get One UserSchema
export async function getToken(token) {
    var id;
    await axios
        .get('/api/users/token/' + token)
        .then(function (res) {
            // console.log(res);
            // console.log(res.data.userId);
            id = res.data.userId;
        })
    // console.log(id);
    return id;
}

// Get All Users
export async function getUsers() {
    const user = {};
    await axios
        .get('/api/users')
        .then(function (res) {
            // console.log(res);
            // console.log(res.data);
            for (var i = 0; i < res.data.length; i++) {
                user[i] = res.data[i];
                // console.log(user[i]);
            }
        })
    console.log(user);
    console.log(user.length);
    for (var i = 0; i < user.length; i++) {
        console.log(user[i]);
    }
    return user;
}

// Verify's To Make Sure Token Isn't Deleted
export async function verifyUsers(token) {
    var data_success, data_error;
    // console.log("Server Token: " + token)
    await axios
        .get('/api/users/verify?token=' + token)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                setInStorage('react_login_app', { token: token });
                // console.log("Server End: " + token);
                data_success = res.data.success;
                data_error = res.data.message;
            };
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
}

// Creates Token and UserSchema
export async function signinUser(user) {
    var data_success, data_token, data_error;
    // console.log("Sign in" + "\nUsername: " + user.username + "\nPassword: " + user.password);
    await axios
        .post('/api/users/signin', user)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                setInStorage('react_login_app', { token: res.data.token });
                data_success = res.data.success;
                data_token = res.data.token;
                data_error = res.data.message;
            }
            else {
                data_success = res.data.success;
                data_error = res.data.message;
            }
        })
    const data = {
        success: data_success,
        token: data_token,
        message: data_error
    }
    // console.log(data);
    return data;
}

// Add's a User
export async function addUser(newUser) {
    var data_success, data_error;
    await axios
        .post('/api/users/signup', newUser)
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

// Changes UserSchema To True For isDeleted
export async function logoutUsers() {
    const obj = getFromStorage('react_login_app');
    const { token } = obj;
    var data_success, data_error;
    // console.log("Server Token: " + token)
    await axios
        .get('/api/users/logout?token=' + token)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                // console.log("Server End: " + token);
                setInStorage('react_login_app', { token: '' });
                data_success = res.data.success;
                data_error = res.data.message;
            };
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    deleteToken(token);
    return data;
}

// Deletes The Token
export async function deleteToken(token) {
    await axios
        .delete('/api/users/token/' + token)
}

// Deletes The User
export async function deleteUser(id) {
    await axios
        .delete('/api/users/' + id)
}