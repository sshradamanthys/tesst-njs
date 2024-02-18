const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./movies.json')

const express = require('express')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: (origin, cb) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'http://movies.com',
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return cb(null, true)
      }

      if (!origin) {
        return cb(null, true)
      }

      return cb(new Error('Not allowed by CORS'))
    },
  })
)

app.disable('x-powered-by')

app.get('/', (req, res) => res.json({ msg: 'Home!' }))

app.get('/movies', (req, res) => {
  if (Object.keys(req.query).length === 0) return res.json(movies)

  const { genre } = req.query

  if (genre) {
    const moviesByGenre = movies.filter((m) => m.genre.includes(genre))
  }

  return res.json(moviesByGenre)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params

  const movie = movies.find((m) => m.id === id)

  if (movie) return res.json(movie)

  return res.json({ msg: 'ID not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params

  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const movieIndex = movies.findIndex((m) => m.id === id)

  if (!movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updatedMovie

  return res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex((m) => m.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}`)
)
