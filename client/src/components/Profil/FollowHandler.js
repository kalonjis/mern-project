import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../utils';

const FollowHandler = ({idToFollow}) =>{ //on récupère la props idToffolow donc => {} !!!!!!
    const userData = useSelector((state)=>state.userReducer);// On récupère les datas dans le store
    const [isFollowed, setIsFollowed]= useState(false);

    const handleFollow=()=>{

    };
    const handleUnFollow=()=>{
        
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
                <span>
                    <button className="unfollow-btn">Abonné</button>
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) &&(
                <span>
                    <button className="unfollow-btn">suivre</button>
                </span>
            )}
        </>
    );
};

export default FollowHandler;