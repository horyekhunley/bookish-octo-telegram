const express = require('express')
const {createCustomer, getCustomers, updateCustomer, deleteCustomer, getCustomer} = require("../controllers/customer.controller");

const router = express.Router()

router.get('/', getCustomers)

router.post('/', createCustomer)

router.put('/:id', updateCustomer)

router.delete('/:id', deleteCustomer)

router.get('/:id', getCustomer)

module.exports = router