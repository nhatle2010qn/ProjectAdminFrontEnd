import { GET_CHART_BY_CATEGORY } from "../actions/actionTypes";

const initialState = {
    data: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHART_BY_CATEGORY:
            return{
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}