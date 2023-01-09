import { toyService } from "../../services/toy.service";

export const SET_TOYS = 'SET_TOYS'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_FILTER:
            return { ...state, filterBy: action.filter }
        default:
            return state;
    }
}