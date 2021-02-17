import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.action";


const initialState = {postErrors: [], userErrors:[]};

const errorReducer = ( state=initialState, action) =>{
    switch (action.type) {
        case GET_POST_ERRORS :
           return {
               postErrors: action.payload,
               userErrors :[]
           } 
        case GET_USER_ERRORS : 
            return {
                userErrors :action.payload,
                postErrors:[]
            }   
    
        default:
           return state
    }


}
export default errorReducer