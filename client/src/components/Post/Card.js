import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser, isEmpty } from '../utils';
import LikeButton from './LikeButton';

const Card = ({post})=>{
    const [isLoading, setIsLoading] = useState(true); // variable pour voir si la data est en train de charger...
    const userData = useSelector((state)=> state.userReducer); // on recup la data user
    const usersData = useSelector((state)=> state.usersReducer);// et la data de tous les users

    useEffect(()=>{ // lorsqu'on monte le composant "Card"
        !isEmpty(usersData[0]) && setIsLoading(false) // si il y a au moins une data du users => on stope le chargement
    }, [usersData])


    return (
        <li className="card-container" key={post._id}>
            {isLoading ?( // On affiche l'icone de chargement 
                <i className="fas fa-spinner fa-spin"></i>/*https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons*/
            ):(
                <>
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id===post.posterId) return user.picture;
                                }).join('')
                            }
                            alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id===post.posterId) return user.pseudo;
                                        }).join('')
                                    }  
                                </h3>
                                {post.posterId !== userData._id &&
                                <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                }
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (
                            <img src={post.picture} alt="card-pic" className="card-pic"/>
                        )}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            
                            ></iframe>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="comment"/>
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post}/>
                            <img src="./img/icons/share.svg" alt="share"/>
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default Card
