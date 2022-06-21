const express = require('express')
const {getMovies, createMovie, updateMovie, deleteMovie, getMovie} = require("../controllers/movie.controller");

const router = express.Router()

router.get('/', getMovies)

router.post('/', createMovie)

router.put('/:id', updateMovie)

router.delete('/:id', deleteMovie)

router.get('/:id', getMovie)

module.exports = router