import { combineReducers , legacy_createStore as createStore  } from "redux"

import { toyReducer } from "./toy/toy-reducer"

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()


const rootReducer = combineReducers({
    toyModule: toyReducer
})

export const store = createStore(rootReducer , middleware)

store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})