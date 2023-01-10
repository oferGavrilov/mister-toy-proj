const fs = require('fs')
const PAGE_SIZE = 1000
var toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    console.log(filterBy)
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.labels) {
        filteredToys = filteredToys.filter(toy => toy.labels.some(label => filterBy.labels === label))
    }
    if (filterBy.inStock > 0) {
        filteredToys = filteredToys.filter(toy => toy.inStock === true)
    }
    if (filterBy.inStock < 0) {
        filteredToys = filteredToys.filter(toy => toy.inStock === true)
    }
    return Promise.resolve(filteredToys)
}

function getById(toyId) {
    const toy = toys.find(toy => toy.id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('Toy not found')
    toys.splice(idx, 1)
    return _writeToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')

        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            res()
        });
    })
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
