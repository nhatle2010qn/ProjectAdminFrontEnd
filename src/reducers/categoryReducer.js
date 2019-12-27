import { GET_CATEGORIES_BY_ID, GET_CATEGORIES_DATA } from "../actions/actionTypes";

const initialState = {
    data: [],
    dataById: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_DATA:
            return{
                ...state,
                data: action.payload
            }
        case GET_CATEGORIES_BY_ID:
            return {
                ...state,
                dataById: action.payload
            }
        default:
            return state;
    }
}