import axios from 'axios';

// Action type
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

// function to get the user info
export const getUser = (uid)=>{
    return(dispatch)=>{  // "dispatch" c'est ce qu'on envoie au reducer
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`) // note: ${uid} est dispo grace au "<UidContext.Provider/>" qui englobe notre "<Routes/>" component (voir App.js)
            .then((res) =>{
                dispatch({ // connexion au userReducer
                    type: GET_USER, //on précise le type qu'on exporte en ligne4
                    payload: res.data // On envoie ici les datas recupérées dans la db avec axios au userReducer
                });
            })
            .catch((err)=> console.log(err));
    };
};

// function to upload a new pic for the user's profile
export const uploadPicture = (data, id)=> {
    return (dispatch)=>{ //traitement pour envoi au reducer:

        return axios
         .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data) //1) on envoie la new data à la db
         .then((res)=>{ 
             return axios
              .get(`${process.env.REACT_APP_API_URL}api/user/${id}`) // 2) On va recupérer les datas du user dans la db
              .then((res) =>{
                dispatch({ //3) on envoie au reducer...
                    type: UPLOAD_PICTURE, 
                    payload: res.data.picture // ...le chemin de l'image
                })
              })
         })
         .catch((err)=> console.log(err));
    }
}

// function to update user's bio
export const updateBio = (userId, bio)=> {
    return (dispatch)=>{
        return axios
         .put(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {bio}) //1) on envoie la new data à la db
         .then((res)=>{
            dispatch({ //2) on envoie au reducer...
                    type: UPDATE_BIO, 
                    payload: bio
            }) 
         })
         .catch((err)=> console.log(err));
    }
}

export const followUser = (followerId, idToFollow) =>{
    return(dispatch) =>{
        return axios
        .patch(`${process.env.REACT_APP_API_URL}api/user/follow/${followerId}`, {idToFollow})
        .then((res)=>{
            dispatch({
                type: FOLLOW_USER,
                payload: {idToFollow}
            })
        })
        .catch((err)=> console.log(err));
    }
}

export const unFollowUser = (followerId, idToUnFollow) =>{
    return(dispatch) =>{
        return axios
        .patch(`${process.env.REACT_APP_API_URL}api/user/unfollow/${followerId}`, {idToUnFollow})
        .then((res)=>{
            dispatch({
                type: UNFOLLOW_USER,
                payload: {idToUnFollow}
            })
        })
        .catch((err)=> console.log(err));
    }
}