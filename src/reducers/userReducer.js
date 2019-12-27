import { LOGIN, GET_CURRENT_USER, LOGOUT, GET_USER_LIST } from "../actions/actionTypes";

const initialState = {
    data: null,
    currentUser: null,
    listData: []
}

export default function (state = initialState, action) {
    let user = localStorage.getItem('currentUser');
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            return {
                ...state,
                data: action.payload
            }
        case GET_CURRENT_USER:
            if (user) {
                state.currentUser = JSON.parse(user)
                return {
                    ...state
                }
            }
            else {
                return initialState
            }
        case LOGOUT:
            localStorage.removeItem('currentUser');
            return state;
        case GET_USER_LIST:
            return{
                ...state,
                listData: action.payload
            }
        default:
            return state;
    }
}