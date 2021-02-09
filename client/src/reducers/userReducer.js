import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.action";
const initialState = {};

export default function userReducer(state=initialState, action){
    switch (action.type) {
        case GET_USER:   
            return action.payload; // on charge le (init)State avec les datas du user 
            
        case UPLOAD_PICTURE:
            return { // return tjs un nouveau state !== modifier l'état existant
                ...state, // On récupère le state à l'aide du '...' spread operator
                picture: action.payload // On lui passe la nouvelle paire ('key:val') picture: chemin de la new pic
            };

        case UPDATE_BIO:
            return { 
                ...state, 
                bio: action.payload // On lui passe la nouvelle paire ('key:val') bio: nouveau contenu
            };

        case FOLLOW_USER:
            return { 
                ...state, 
                following: [action.payload.idToFollow, ...state.following]
            };
        case UNFOLLOW_USER:
            return { 
                ...state, 
                following: state.following.filter(
                    (id)=> id !== action.payload.idToUnFollow
                )

            };

            
        default:
            return state;
            
    }
}