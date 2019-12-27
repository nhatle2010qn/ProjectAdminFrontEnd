import { combineReducers } from "redux";
import product from './productReducer';
import category from './categoryReducer';
import brand from './brandReducer';
import order from './orderReducer';
import chart from './chartReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    product,
    category,
    brand,
    order,
    chart,
    user
});

export default rootReducer;