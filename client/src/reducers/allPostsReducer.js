import { GET_ALL_POSTS } from "../actions/post.actions";


const initialState = {};

const allPostsReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_POSTS:
            return action.payload;
    
        default:
            return state
    };
};
export default allPostsReducer;