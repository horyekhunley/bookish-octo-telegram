const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    }
})

const Customer = new mongoose.model('Customer', customerSchema)

const validateCustomer = (customer) => {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required(),
    })
    return schema.validate(customer)
}

module.exports = { Customer, validateCustomer }