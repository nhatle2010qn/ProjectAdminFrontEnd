import axios from '../axios/axios';
import { GET_CATEGORIES_BY_ID, GET_CATEGORIES_DATA } from './actionTypes';

export const getCategoryById = (id) => async dispatch => {
    await axios
        .get('api/Category/GetById/' + id)
        .then(res => dispatch({ type: GET_CATEGORIES_BY_ID, payload: res.data }))
}

export const getCategotyData = () => async dispatch => {
    await axios
        .get('/api/Category/List')
        .then(res => dispatch({ type: GET_CATEGORIES_DATA, payload: res.data }))
}
export const deleteCategoryData = (id) => async dispatch => {
    await axios
        .delete('/api/Category/Delete?id=' + id)
        .then(res => console.log(res));
}

export const postCategoryData = (category) => async dispatch => {
    await axios
        .post('api/Category/Save', category)
        .then(res => console.log(res))

}
