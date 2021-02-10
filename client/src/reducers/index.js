import {combineReducers} from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';



export default combineReducers({
    userReducer,
    usersReducer,
    postReducer
})