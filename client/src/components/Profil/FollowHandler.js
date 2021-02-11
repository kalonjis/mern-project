import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/user.action';
import { isEmpty } from '../utils';

const FollowHandler = ({idToFollow, type}) =>{ //on récupère la props idToffolow donc => {} !!!!!!
    const userData = useSelector((state)=>state.userReducer);// On récupère les datas dans le store
    const [isFollowed, setIsFollowed]= useState(false);
    const dispatch = useDispatch()

    const handleFollow=()=>{
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true)
    };
    const handleUnFollow=()=>{
        dispatch(unFollowUser(userData._id, idToFollow));
        setIsFollowed(false)
    };
    useEffect(()=> {
        if (!isEmpty(userData.following)){ //Si l'utilisateur suis déjà au moins une personne
            if((userData.following).includes(idToFollow)){ // si la liste contient déjà la personne 
                setIsFollowed(true); 
            }else {
                setIsFollowed(false)
            };
        };
    }, [userData, idToFollow]) // call back: si l'un de ses 2 param. change ça rapelle la fct


    
    return (
        <>
            {isFollowed && !isEmpty(userData) &&(
                <span onClick={handleUnFollow}>
                    {type ==='suggestion' &&<button className="unfollow-btn">Abonné</button>}
                    {type ==='card' && <img src="./img/icons/checked.svg" alt="checked"/>}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) &&(
                <span onClick={handleFollow}>
                    {type ==='suggestion' &&<button className="unfollow-btn">suivre</button>}
                    {type ==='card' && <img src="./img/icons/check.svg" alt="check"/>}

                </span>
            )}
        </>
    );
};

export default FollowHandler;