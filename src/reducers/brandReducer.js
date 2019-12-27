import { GET_BRAND_DATA, GET_BRAND_BY_ID } from "../actions/actionTypes";

const initialState = {
    data: [],
    dataById: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BRAND_DATA:
            return{
                ...state,
                data: action.payload
            }
        case GET_BRAND_BY_ID:
            return {
                ...state,
                dataById: action.payload
            }
        default:
            return state;
    }
}