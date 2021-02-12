import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './utils';

const Thread = () =>{

    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5) // pour gérer l'infinite scroll (on en affiche 5 à la fois)
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.postReducer);

    const loadMore =()=>{
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadPost(true)
        } // si on touche le bas, setLoad passe sur true et ça relance le useEffect...
    }

    useEffect(()=>{
        if(loadPost){
            dispatch(getPosts(count)) // on passe le count en parametre
            setLoadPost(false); // On stoppe le chargement
            setCount(count+5); // On incrémente le count
        }
        window.addEventListener('scroll', loadMore); // On surveille le scroll avec loadMore
        return ()=> window.removeEventListener('scroll', loadMore); //On stoppe la surveillance - bizarre mais c'est comme ça haha
    }, [loadPost, dispatch, count])

    return (
        <div className="thread-container">
           <ul>
               {!isEmpty(posts[0]) &&
                posts.map((post) =>{
                   return <Card post={post} key={post._id} />
                })
               }
           </ul>
        </div>
    )
}

export default Thread