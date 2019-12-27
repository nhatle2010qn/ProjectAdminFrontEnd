import axios from '../axios/axios';
import { GET_PRODUCT_DATA, GET_PRODUCT_BY_ID } from './actionTypes';

export const getProductData = (page, size, search) => async dispatch => {
    await axios
        .get('/api/Product/GetProductListPaging?page=' + page + '&size=' + size + '&search=' + search)
        .then(res => dispatch({ type: GET_PRODUCT_DATA, payload: res.data }))
}

export const getProductById = (id) => async dispatch => {
    await axios
        .get('api/Product/GetById/' + id)
        .then(res => dispatch({ type: GET_PRODUCT_BY_ID, payload: res.data }))
}

export const deleteProductData = (id) => async dispatch => {
    await axios
        .delete('/api/Product/DeleteProduct?id=' + id)
        .then(res => console.log(res));
}

export const postProductData = (product) => async dispatch => {
    await axios
        .post('api/Product/Save', product)
        .then(res => console.log(res))
}
