import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'
const TOY_KEY = 'toyDB'

// _createToys()

export const toyService = {
    query,
    getDefaultFilter,
    get,
    remove,
    save
}


function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.name}&labels=${filterBy.labels}&inStock=${filterBy.inStock}`
    return httpService.get(BASE_URL + queryParams)
}

function remove(toyId){
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if(toy._id) {
        return httpService.put(BASE_URL , toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking doll', 123, ['Doll', 'Battery powered', 'Baby'], false, 'doll.png'))
        toys.push(_createToy('Lego game', 150, ['Battery powered', 'Baby'], true, 'lego.png'))
        toys.push(_createToy('Toy car', 170, ['Doll', 'Baby'], false, 'toy-car.png'))
        toys.push(_createToy('Toy plane', 200, ['Doll', 'Battery powered'], false, 'toy-plane.png'))
        toys.push(_createToy('Bucket', 250, ['Baby'], true, 'logo.png'))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, price, labels, inStock, img) {
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