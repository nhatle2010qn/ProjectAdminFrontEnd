import axios from '../axios/axios';
import { GET_CHART_BY_CATEGORY } from './actionTypes';

export const getChartByCategory = (sort) => async dispatch => {
    await axios
        .get('/api/Chart/GetChartByCategory?sortDate=' + sort)
        .then(res => dispatch({ type: GET_CHART_BY_CATEGORY, payload: res.data }))
}