import axios from '../axios/axios';
import { LOGIN, GET_CURRENT_USER, LOGOUT } from './actionTypes';


export const login = (user) => async dispatch => {
    await axios
        .post('api/Account/SignIn', user)
        .then(res => dispatch({ type: LOGIN, payload: res.data }))
}

export const getCurrentUser = () => dispatch => {
    dispatch({
        type: GET_CURRENT_USER
    })
}

export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT
    })
}
