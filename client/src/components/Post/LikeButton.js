import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext'; 
import Popup from 'reactjs-popup';// npm i -s reactjs-popup
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/post.actions';

const LikeButton = ({post})=>{
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext); // On recupère l'Uid (si connecté!) (pas besoin de redux ici!!!)
    const dispatch= useDispatch();

    useEffect(()=>{
        if(post.likers.includes(uid)){ //On check si l'ensemble des likers contient l'uid
            setLiked(true)
        }
    },[uid, post.likers, liked])

    const like =()=>{
        dispatch(likePost(post._id, uid))
        setLiked(true);
    };

    const unLike =()=>{
        
    };

    return (
    <div className="like-container"> 
        {uid === null &&
            <Popup trigger={<img src="./img/icons/heart.svg" alt="like"/>} 
                   position={['bottom center', 'bottom right', 'bottom left']}
                   closeOnDocumentClick>
                <div>Connectez-vous pour aimer un post !</div>
            </Popup>
        }
        {uid && liked === false && (
            <img src="./img/icons/heart.svg" onClick={like} alt="like"/>
        )}
        {uid && liked === true && (
            <img src="./img/icons/heart-filled.svg" onClick={unLike} alt="unlike"/>
        )}
    </div>
    )
}

export default LikeButton