const { Movie, validateMovie } = require('../models/movie.model')
const Genre = require('../models/genre.model')

exports.getMovies = async (req, res) => {
    const movies = await Movie.find().sort('title')
    res.status(200).send(movies)
}

exports.createMovie = async (req, res) => {
    const {error} = validateMovie(req.body)
    if (error) return res.send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send(`The genre with id ${req.body.genreId} was not found`)

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    movie = await movie.save()
    res.status(201).json({
        message: 'Movie created successfully',
        movie
    })
}

exports.updateMovie = async (req, res) => {
    const {error} = validateMovie(req.body)
    if (error) return res.send(error.details[0].message)

    const movie = await Movie.findByIdAndUpdate(req.params.id, { ...req.body }, {
        new: true
    })
    if (!movie){
        return res.status(404).send(`The movie with id ${req.params.id} was not found`)
    }
    res.status(200).json({
        message: 'Movie updated successfully',
        movie
    })
}

exports.deleteMovie = async (req, res) => {
    const {error} = validateMovie(req.body)
    if (error) return res.send(error.details[0].message)

    const movie = await Movie.findByIdAndRemove(req.params.id)

    if (!movie){
        return res.status(404).send(`The movie with id ${req.params.id} was not found`)
    }
    res.status(200).json({message: 'Movie deleted', movie })
}

exports.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie){
        return res.status(404).send(`The movie with id ${req.params.id} was not found`)
    }
    res.status(200).send(movie)
}