import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import {useDispatch, useSelector} from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user.action';
import { dateParser } from '../utils';
import FollowHandler from './FollowHandler';
 
// Component sous la barre Navbar qu'on récupère dans la page '/profil' quand user est connecté
const UpdateProfil = ()=>{
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false); // pour gérer l'affichage conditionnel
    const userData = useSelector((state)=>state.userReducer);// On récupère les datas dans le store
    const usersData = useSelector((state)=>state.usersReducer);// On récupère les datas dans le store
    const dispatch = useDispatch() // on instancie la methode pour pouvoir l'utiliser ds le callback
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate=()=>{
        dispatch(updateBio(userData._id, bio)); // déclanche l'action updateBio
        setUpdateForm(false); // permet de changer l'affichage
    }

    // On affiche la LeftNav, l'uploadImg et la Bio
    return (
        <div className="profil-container">
            <LeftNav/>
            <h1> Profil de {userData.pseudo}</h1>
            <div className="update-container" >
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <div className="bio-pdate">
                        <h3>Bio</h3>
                        {updateForm === false && (  /*affichage conditionnel*/
                            <>
                              <p onClick={()=>setUpdateForm(!updateForm)} >{userData.bio}</p>
                              <button onClick={()=>setUpdateForm(!updateForm)}>Modifier Bio</button>
                            </>
                        )}
                        {updateForm && (  /*affichage conditionnel*/
                            <>
                              <textarea type="text" defaultValue={userData.bio} onChange={(e)=>setBio(e.target.value)}>
                              </textarea>
                              <button onClick={handleUpdate} >Valider modifications</button>  
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {dateParser(userData.createdAt)/* date de la db formatée */}</h4>
                    <h5 onClick={()=>setFollowingPopup(true)}> 
                        Abonnements {userData.following? userData.following.length:""/*Il faut mettre une ternaire sinon affiche erreur*/}
                    </h5>
                    <h5 onClick={()=>setFollowersPopup(true)}>
                        Abonnés {userData.followers? userData.followers.length:""}
                    </h5>
                </div>
            </div>
            { followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={()=> setFollowingPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                    for (let i = 0; i < userData.following.length; i++) {
                                        if (user._id === userData.following[i]){
                                            return (
                                                <li key={user._id}>
                                                    <img src={user.picture} alt="user-pic"/>
                                                    <h4>{user.pseudo}</h4>
                                                    <div className="follow-handler">
                                                        <FollowHandler idToFollow={user._id} type={'suggestion'}/>
                                                    </div>
                                                </li>
                                            )
                                        }  
                                    }return null // ça fct sans mais alors il afiche une err ds la console
                                })
                            }
                        </ul>
                    </div>
                </div>)
            }
            { followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className="cross" onClick={()=> setFollowersPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData.map((user) => {
                                    for (let i = 0; i < userData.followers.length; i++) {
                                        if (user._id === userData.followers[i]){
                                            return (
                                                <li key={user._id}>
                                                <img src={user.picture} alt="user-pic"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} type={'suggestion'}/>
                                                </div>
                                                </li>
                                            )
                                        }  
                                    }return null //ça fct sans mais alors il afiche une err ds la console
                                })
                            }                            
                        </ul>
                    </div>
                </div>)
            }
        </div>
        
    )
}
export default UpdateProfil;