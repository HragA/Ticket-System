import { combineReducers } from 'redux';
import customerReducer from './customerReducer';

export default combineReducers({
    customer: customerReducer
});