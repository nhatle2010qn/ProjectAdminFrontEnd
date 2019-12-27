import { GET_ORDER_DATA, GET_ORDER_DETAIL_DATA } from "../actions/actionTypes";

const initialState = {
    data: [],
    dataById: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_DATA:
            return {
                ...state,
                data: action.payload
            }
        case GET_ORDER_DETAIL_DATA:
            return{
                ...state,
                dataById: action.payload
            }
        default:
            return state;
    }
}