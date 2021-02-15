import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { dateParser, isEmpty } from '../utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

const Card = ({post})=>{
    const [isLoading, setIsLoading] = useState(true); // variable pour voir si la data est en train de charger...
    const [isUpdated, setIsUpdated] = useState(false); // pour gérer affichage mode édition ou pas
    const [textUpdate, setTextUpdate] = useState(null); // pour stocker le texte update
    const [showComments, setShowComments] = useState(false)// gérer l'affichage des comments
    const userData = useSelector((state)=> state.userReducer); // on recup la data user
    const usersData = useSelector((state)=> state.usersReducer);// et la data de tous les users
    const dispatch = useDispatch();

    // fct pour éditer le post.message
    const updateItem = ()=>{
        dispatch(updatePost(post._id, textUpdate))
        setIsUpdated(false) // on désactive le mode édition
    }

    useEffect(()=>{ // lorsqu'on monte le composant "Card"
        !isEmpty(usersData[0]) && setIsLoading(false) // si il y a au moins une data du users => on stope le chargement
    }, [usersData])


    return (
        <li className="card-container" key={post._id}>
            {isLoading ?( // On affiche l'icone de chargement 
                <i className="fas fa-spinner fa-spin"></i>/*https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons*/
            ):(
                /*On affiche le post complet */
                <> 
                    {/*Partie en haut à gauche -Photo du user */}
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id===post.posterId){ 
                                        return user.picture;
                                    }else return null
                                }).join('')
                            }
                            alt="poster-pic"
                        />
                    </div>
                    {/*Partie centrale de la Card */}
                    <div className="card-right">
                        <div className="card-header"> {/*Partie en haut Nom et date de création */}
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id===post.posterId){
                                                return user.pseudo;
                                            } else return null
                                        }).join('')
                                    }  
                                </h3>
                                {post.posterId !== userData._id &&
                                <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                }
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        
                        {/* Affichage du post.message */}
                        {isUpdated === false && <p>{post.message}</p>}

                        {/* Affichage de la textarea pour éditer le post.message */} 
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message /* on récupère le message actuel */} 
                                    onChange={(e)=>setTextUpdate(e.target.value) /* on met à jour textUpdate */ }
                                />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem /* fct qui va appeler note action updatePost */}>
                                        valider la modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {/*Photo du post */}
                        {post.picture && (
                            <img src={post.picture} alt="card-pic" className="card-pic"/>
                        )}

                        {/*Vidéo du post */}
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

                        {/* Boutons en bas à gauche ("edit" et "delete"*/}
                        {userData._id ===post.posterId &&(
                            <div className="button-container">
                                <div onClick={()=>setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit"/>
                                </div>
                                <DeleteCard id={post._id}/> 
                            </div>
                        )}

                    {/**Bas de la Card : boutons (icones) "comments", "likes" & "share"*/}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img 
                                    src="./img/icons/message1.svg" alt="comment"
                                    onClick={()=> setShowComments(!showComments)}
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post}/>
                            <img src="./img/icons/share.svg" alt="share"/> {/* pas géré ici*/}
                        </div>
                        {showComments && <CardComments post={post}/>}
                    </div>
                </>
            )}
        </li>
    )
}

export default Card
