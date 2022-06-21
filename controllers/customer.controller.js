const { Customer, validateCustomer } = require('../models/customer.model')

exports.getCustomers = async (req, res) => {
    const customers = await Customer.find().sort('username')
    res.status(200).send(customers)
}

exports.createCustomer = async (req, res) => {
    const {error} = validateCustomer(req.body)
    if (error) return res.send(error.details[0].message)

    let customer = new Customer({
        ...req.body
    })
    customer = await customer.save()
    res.status(201).json({
        message: 'Customer created successfully',
        customer
    })
}

exports.updateCustomer = async (req, res) => {
    const {error} = validateCustomer(req.body)
    if (error) return res.send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id, { username: req.body.username, isGold: req.body.isGold, phone: req.body.phone }, {
        new: true
    })
    if (!customer){
        return res.status(404).send(`The customer with id ${req.params.id} was not found`)
    }
    res.status(200).json({
        message: 'Customer updated successfully',
        customer
    })
}

exports.deleteCustomer = async (req, res) => {
    const {error} = validateCustomer(req.body)
    if (error) return res.send(error.details[0].message)

    const customer = await Customer.findByIdAndRemove(req.params.id)

    if (!customer){
        return res.status(404).send(`The customer with id ${req.params.id} was not found`)
    }
    res.status(200).json({message: 'Customer deleted', customer })
}

exports.getCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer){
        return res.status(404).send(`The customer with id ${req.params.id} was not found`)
    }
    res.status(200).send(customer)
}