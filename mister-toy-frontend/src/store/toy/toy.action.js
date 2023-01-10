import { SET_TOYS, SET_FILTER, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from "./toy-reducer.js"
import { store } from "../store.js"
import { toyService } from "../../services/toy.service.js"

export function loadToys() {

    const { filterBy } = store.getState().toyModule
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log("Had issues loading toys", err)
            throw Error(err)
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .catch(err => {
            console.log('Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = (!toy._id) ? ADD_TOY : UPDATE_TOY
    return toyService.save(toy)
        .then((savedToy) => store.dispatch({ type, toy: savedToy }))
}

export function setFilter(filter) {
    return Promise.resolve(store.dispatch({ type: SET_FILTER, filter }))
}