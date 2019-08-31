const express = require('express');
const router = express.Router();

// Hash a Password
// import bcrypt from 'bcryptjs';
// const SALT_WORK_FACTORY = 10;

// Customer Model
const Customer = require('../../models/Customer');

// @route   GET api/Customers
// @desc    Get all Customers
// @access  Public`
router.get('/', (req, res) => {
    Customer.find()
        .sort({ date: -1 })
        .then(customers => res.json(customers))
});

// @route   GET api/Customers/cust/id
// @desc    Get one Customers
// @access  Public`
router.get('/cust/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
});

// @route   POST api/Customers
// @desc    Create An Customer
// @access  Public
router.post('/', (req, res) => {
    // bcrypt.hash('req.body.password', SALT_WORK_FACTORY, (err, hash) => {
    //     // Store hash in database
    //     req.body.password = hash;
    // });
    const newCustomer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    });

    newCustomer.save((err, customer) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            customer,
            success: true,
            message: 'Signed up'
        });
    });
    
    
    
    // .then(customer => 
    //     // res.json(customer)
    //     res.send({
    //         customer,
    //         success: false,
    //         message: 'Error'
    //     })
    // );
});

// @route   POST api/Customers/cust/id
// @desc    Create An Customer
// @access  Public
router.post('/cust/:id', (req, res) => {
    Customer.findOneAndUpdate({_id:req.params.id}, req.body, function (err, user) {
        user.validated = true;
        user.dateLastModified = new Date();
        user.save(function(err) {
            if(err)
                res.send('Error: Could not validate user');
            else
                res.json({ success: true });
        });
    });
});


// @route   DELETE api/Customers:id
// @desc    Delete An Customer
// @access  Public
router.delete('/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => customer.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;