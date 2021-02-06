import { GET_USER, UPLOAD_PICTURE } from "../actions/user.action";
const initialState = {};

export default function userReducer(state=initialState, action){
    switch (action.type) {
        case GET_USER:   
            return action.payload; // on charge le initState avec les datas du user 
            
        case UPLOAD_PICTURE:
            return { // return tjs un nouveau state !== modifier l'état existatant
                ...state, // On récupère le state à l'aide du '...' spread operator
                picture: action.payload // On lui passe la nouvel paire ('key:val') picture: chemin de la new pic
            };
            
        default:
            return state;
            
    }
}