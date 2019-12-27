import axios from '../axios/axios';
import { GET_BRAND_BY_ID, GET_BRAND_DATA } from './actionTypes';

export const getBrandById = (id) => async dispatch => {
    await axios
        .get('api/Brand/GetById/' + id)
        .then(res => dispatch({ type: GET_BRAND_BY_ID, payload: res.data }))
}

export const getBrandData = () => async dispatch => {
    await axios
        .get('/api/Brand/List')
        .then(res => dispatch({ type: GET_BRAND_DATA, payload: res.data }))
}
export const deleteBrandData = (id) => async dispatch => {
    await axios
        .delete('/api/Brand/Delete?id=' + id)
        .then(res => console.log(res));
}

export const postBrandData = (brand) => async dispatch => {
    await axios
        .post('api/Brand/Save', brand)
        .then(res => console.log(res))

}
