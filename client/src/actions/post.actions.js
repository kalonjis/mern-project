import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

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
        return axios
            .patch(`${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`)
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
        url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,  
        data: { id: userId },
      })
        .then((res) => {
          dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        })
        .catch((err) => console.log(err));
    };
  };