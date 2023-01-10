const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const toyService = require('./services/toy.service.js')
const app = express()


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}
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

app.get('/api/toy/:id', (req, res) => {
    const { toyId } = req.params.id
    toyService.getById(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(400).send('Cannot get toy')
        })
})

// Update
app.put('/api/toy', (req, res) => {
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

app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Car removed successfully', toyId })
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(400).send('Cannot remove toy')
        })
})

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

