export const SET_TOYS = 'SET_TOYS'


const initialState ={
    toys:[]
}

export function toyReducer(state = initialState , action) {
    switch (action.type) {
        case SET_TOYS:
            return {...state,toys: action.toys}
        default:
            return state;
    }
}