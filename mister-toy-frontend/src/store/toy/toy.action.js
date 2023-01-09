

import { SET_TOYS , SET_FILTER } from "./toy-reducer.js"
import { store } from "../store.js"
import { toyService } from "../../services/toy.service.js"

export function loadToys(){

    const {filterBy} = store.getState().toyModule
    return toyService.query(filterBy)
        .then((toys) =>{
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log("Had issues loading toys" , err)
            throw Error(err)
        })
}

export function setFilter(filter) {
    return Promise.resolve(store.dispatch({ type: SET_FILTER , filter}))
}