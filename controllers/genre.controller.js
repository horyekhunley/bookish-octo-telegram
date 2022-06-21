const { Genre, validateGenre } = require('../models/genre.model')

exports.getGenres = async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.status(200).send(genres)
}
exports.createGenre = async (req, res) => {
    const {error} = validateGenre(req.body)
    if (error) return res.send(error.details[0].message)

    let genre = new Genre({
        ...req.body
    })
    genre = await genre.save()
    res.status(201).json({
        message: 'Genre created successfully',
        genre
    })
}
exports.updateGenre = async (req, res) => {
    const {error} = validateGenre(req.body)
    if (error) return res.send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    if (!genre){
        return res.status(404).send(`The genre with id ${req.params.id} was not found`)
    }
    res.status(200).json({
        message: 'Genre updated successfully',
        genre
    })
}
exports.deleteGenre = async (req, res) => {
    const {error} = validateGenre(req.body)
    if (error) return res.send(error.details[0].message)

    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre){
        return res.status(404).send(`The genre with id ${req.params.id} was not found`)
    }
    res.status(200).json({message: 'Genre deleted', genre })
}
exports.getGenre = async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre){
        return res.status(404).send(`The genre with id ${req.params.id} was not found`)
    }
    res.send(genre)
}