import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getDefaultFilter,
    getById,
    remove,
    save,
    getEmptyToy,
    getLabels
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

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: '' }
}

function getEmptyToy() {
    return {name:'' , price:'' , labels:[], inStock: true , createdAt: Date.now()}
}

function getLabels() {
    return [ "Baby", "Doll", "Battery Powered"]
}