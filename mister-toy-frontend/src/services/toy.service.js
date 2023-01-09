import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOY_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getDefaultFilter,
    get
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(TOY_KEY)
        .then((toys) => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.labels) {
                toys = toys.filter(toy => toy.labels.some(label => filterBy.labels === label))
            }
            if (filterBy.inStock > 0) {
                toys = toys.filter(toy => toy.inStock === true)
            }
            if (filterBy.inStock < 0) {
                toys = toys.filter(toy => toy.inStock === true)
            }
            return toys
        })
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking doll', 123, ['Doll', 'Battery powered', 'Baby'], false , 'doll.png'))
        toys.push(_createToy('Lego game', 150, ['Battery powered', 'Baby'], true , 'lego.png'))
        toys.push(_createToy('Toy car', 170, ['Doll', 'Baby'], false , 'toy-car.png'))
        toys.push(_createToy('Toy plane', 200, ['Doll', 'Battery powered'], false , 'toy-plane.png'))
        toys.push(_createToy('Bucket', 250, ['Baby'], true ,'logo.png' ))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price, labels , inStock , img) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        img,
        labels,
        msg: utilService.makeLorem(30),
        createdAt: 1631031801011,
        inStock,
    }
}