import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

export const getPosts=() =>{
    return (dispatch) =>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then ((res)=>{
                dispatch({
                    type: GET_POSTS,
                    payload: res.data
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