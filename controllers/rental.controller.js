const { Rental, rentalSchema } = require('../models/rental.model')
const { Movie, validateMovie} = require('../models/movie.model')
const { Customer } = require('../models/customer.model')
const Fawn = require('fawn')
require('dotenv').config()

Fawn.init('mongodb://localhost/vidly')

exports.getRentals = async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
}
exports.createRental = async (req, res) => {
    const {error} = validateMovie(req.body)
    if (error) return res.send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(404).send(`The customer with id ${req.body.genreId} was not found`)

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(404).send(`The movie with id ${req.body.movieId} was not found`)

    if (movie.numberInStock === 0) return res.status(400).send('Movie not available')

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run()
    }catch (ex){
        res.status(500).send('Something failed.')
    }


    res.send(rental)

}