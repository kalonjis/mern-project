import {combineReducers} from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import allPostsReducer from './allPostsReducer';
import trendingReducer from './trendingReducer';




export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
    allPostsReducer,
    trendingReducer

})