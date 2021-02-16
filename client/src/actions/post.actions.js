import axios from 'axios';

// post
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// comments
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const getPosts=(num) =>{
    return (dispatch) =>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then ((res)=>{
                const array = res.data.slice(0, num);// créer le tableau pour l'infinite scroll
                dispatch({
                    type: GET_POSTS,
                    payload: array 
                })
            })
            .catch((err)=>{console.log(err)})
    }
}

export const likePost=(postId, userId) =>{
    return (dispatch)=>{
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`,
            data: {id:userId}
        })
        .then ((res)=>{
            dispatch({
                type: LIKE_POST,
                payload: {postId, userId}
            })
        })
        .catch ((err)=> console.log(err))
    }
}

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
      return axios({ // "axios.patch" ne fonctionne pas ici...Et je ne sais pas pq!!!!!!
        method: "patch", //obligé de déstructuré comme ici!
        url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`,  
        data: { id: userId },
      })
        .then((res) => {
          dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
};

export const updatePost = (postId, message) =>{
    return(dispatch) =>{
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: {message}  //DON'T FORGET THE "{}"!!!!!!!!!
        })
        .then((res)=>{
            dispatch({
                type: UPDATE_POST,
                payload: {message, postId}//DON'T FORGET THE "{}"!!!!!!!!!
            })
        })
        .catch((err)=>console.log(err))
    }
};

export const deletePost = (postId)=>{
    return(dispatch)=>{
        return axios
            .delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
            .then((res)=>{
                dispatch({
                    type: DELETE_POST,
                    payload: {postId}
                })
            })
            .catch((err)=> console.log(err))
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) =>{
    return(dispatch)=>{
        return axios({
                method:"patch",
                url:`${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
                data: {commenterId, text, commenterPseudo}
            })
            .then((res)=>{
                dispatch({
                    type: ADD_COMMENT,
                    payload: {postId}
                });
            })
            .catch((err)=> console.log(err))
    }
}

export const editComment = (postId, commentId, text) =>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data: {commentId, text}

        })
        .then((res)=>{
            dispatch({
                type: EDIT_COMMENT,
                payload: {postId, commentId, text}
            })
        })
        .catch((err)=>console.log(err))
    }
}

export const deleteComment = (postId, commentId)=>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data: {commentId}
        })
        .then((res)=>{
            dispatch({
                type: DELETE_COMMENT,
                payload: {postId, commentId}
            })
        })
        .catch((err)=>console.log(err))
    };
};
