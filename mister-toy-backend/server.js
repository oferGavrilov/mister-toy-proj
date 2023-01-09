const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const toyService = require('./services/toy.service.js')
const app = express()

// App configuration
app.use(express.static('public'))
const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

// List
app.get('/api/toy', (req, res) => {
    const filterBy = req.query
    toyService.query(filterBy)
        .then((toys) => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toys')
        })
})

// Update
app.put('/api/toy' , (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot update toy')
        })
})

// Create
app.post('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot create toy')
        })
})

// Read - Get By ID
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(400).send('Cannot get toy')
        })
})

app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => {
            res.send({msg:'Car removed successfully' , toyId})
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(400).send('Cannot remove toy')
        })
})

app.listen(3030, () => console.log('Server listening on port 3030!'))