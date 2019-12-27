import axios from '../axios/axios';
import { GET_ORDER_DATA, GET_ORDER_DETAIL_DATA } from './actionTypes';
import { toast } from 'react-toastify';

export const getOrderData = () => async dispatch => {
    await axios
        .get('/api/Order/GetOrderList')
        .then(res => dispatch({ type: GET_ORDER_DATA, payload: res.data }))
}

export const getOrderDetailData = (id) => async dispatch => {
    await axios
        .get('/api/Order/GetOrderDetailList/' + id)
        .then(res => dispatch({ type: GET_ORDER_DETAIL_DATA, payload: res.data }))
}

export const updateOrder = (order) => async dispatch =>{
    await axios
    .post('api/Order/UpdateOrderStatus', order)
    .then(toast.success('Update Product Successfully!!!!'));
}