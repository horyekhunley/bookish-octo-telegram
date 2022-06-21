const express = require('express')
const mongoose = require('mongoose')
const ip = require('ip')

const genreRouter = require('./routes/genre.route')
const customerRouter = require('./routes/customer.route')
const movieRouter = require('./routes/movie.route')
const rentalRouter = require('./routes/rental.route')
const logger = require('./util/logger')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/vidly')
    .then(() => logger.info(`MongoDB connected...`))
    .catch(err => logger.error('MongoDB connection error'))

app.use('/api/genre', genreRouter)
app.use('/api/customer', customerRouter)
app.use('/api/movie', movieRouter)
app.use('/api/rental', rentalRouter)

const port = process.env.PORT || 3000
app.listen(port, () => logger.info(`Server running on ${ip.address()}:${port}`))

