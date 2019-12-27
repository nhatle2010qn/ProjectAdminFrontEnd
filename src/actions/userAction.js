import axios from '../axios/axios';
import { GET_USER_LIST } from './actionTypes';

export const getUserList = () => async dispatch => {
    await axios
        .get('/api/User/GetUserList')
        .then(res => dispatch({ type: GET_USER_LIST, payload: res.data }))
}